"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  KITCHEN_SMS,
  PAYMENT_PHONE_DISPLAY,
  PAYSTACK_PUBLIC_KEY_BUILD,
} from "@/lib/checkout-public-env"

export interface CheckoutItem {
  name: string
  price: string
}

function paystackOrderSmsText(
  item: CheckoutItem,
  verified: { reference: string; amountGhs: string },
) {
  return `Hello 3 Seconds Kitchen — PAYSTACK PAID
Item: ${item.name}
Menu price: ${item.price}
Verified amount: GHS ${verified.amountGhs}
Paystack ref: ${verified.reference}
Please prepare my order. Thank you.`
}

interface OrderCheckoutDialogProps {
  item: CheckoutItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function loadPaystackScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"))
  if (window.PaystackPop) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://js.paystack.co/v1/inline.js"]')
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("Paystack script failed")), { once: true })
      return
    }
    const s = document.createElement("script")
    s.src = "https://js.paystack.co/v1/inline.js"
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("Paystack script failed"))
    document.body.appendChild(s)
  })
}

export function OrderCheckoutDialog({ item, open, onOpenChange }: OrderCheckoutDialogProps) {
  const [amountPaid, setAmountPaid] = useState("")
  const [transactionRef, setTransactionRef] = useState("")
  const [paidConfirmed, setPaidConfirmed] = useState(false)

  const [payEmail, setPayEmail] = useState("")
  const [payAmountGhs, setPayAmountGhs] = useState("")
  const [paystackBusy, setPaystackBusy] = useState(false)
  const [paystackError, setPaystackError] = useState<string | null>(null)
  const [verifiedPaystack, setVerifiedPaystack] = useState<{
    reference: string
    amountGhs: string
  } | null>(null)

  /** null = not loaded yet; string (maybe "") = from server at runtime */
  const [fetchedPaystackPublicKey, setFetchedPaystackPublicKey] = useState<string | null>(null)

  const paystackPublicKey =
    fetchedPaystackPublicKey !== null ? fetchedPaystackPublicKey : PAYSTACK_PUBLIC_KEY_BUILD

  useEffect(() => {
    if (!open) {
      setAmountPaid("")
      setTransactionRef("")
      setPaidConfirmed(false)
      setPayEmail("")
      setPayAmountGhs("")
      setPaystackBusy(false)
      setPaystackError(null)
      setVerifiedPaystack(null)
      setFetchedPaystackPublicKey(null)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    let cancelled = false
    fetch("/api/paystack/public-config")
      .then((r) => r.json())
      .then((d: { publicKey?: string }) => {
        if (!cancelled) setFetchedPaystackPublicKey((d.publicKey ?? "").trim())
      })
      .catch(() => {
        if (!cancelled) setFetchedPaystackPublicKey("")
      })
    return () => {
      cancelled = true
    }
  }, [open])

  const verifyReference = useCallback(async (reference: string) => {
    const res = await fetch("/api/paystack/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    })
    const data = (await res.json()) as {
      ok?: boolean
      error?: string
      reference?: string
      amountDisplay?: string
    }
    if (!res.ok || !data.ok) {
      throw new Error(data.error ?? "Could not verify payment")
    }
    return {
      reference: data.reference ?? reference,
      amountGhs: data.amountDisplay ?? "—",
    }
  }, [])

  const openPaystack = useCallback(async () => {
    if (!item) return
    const orderItem = item
    setPaystackError(null)

    const email = payEmail.trim()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setPaystackError("Enter a valid email address.")
      return
    }

    const ghs = Number.parseFloat(payAmountGhs.replace(",", "."))
    if (!Number.isFinite(ghs) || ghs < 1) {
      setPaystackError("Enter amount in GHS (minimum 1).")
      return
    }

    const amountPesewas = Math.round(ghs * 100)
    if (amountPesewas < 100) {
      setPaystackError("Amount too small.")
      return
    }

    if (!paystackPublicKey) {
      setPaystackError(
        "Paystack public key is missing. In Vercel add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY or PAYSTACK_PUBLIC_KEY, then redeploy (or open this dialog again after saving).",
      )
      return
    }

    setPaystackBusy(true)
    try {
      await loadPaystackScript()
      const PaystackPop = window.PaystackPop
      if (!PaystackPop) {
        throw new Error("Paystack did not load")
      }

      const ref = `3sec_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`

      // Paystack inline.js expects plain functions (not async); async callbacks can throw "callback must be a valid function".
      function onPaystackSuccess(response: { reference: string }) {
        setPaystackBusy(true)
        setPaystackError(null)
        verifyReference(response.reference)
          .then((verified) => {
            setVerifiedPaystack(verified)
            setAmountPaid(verified.amountGhs)
            setTransactionRef(verified.reference)
            // Open the device SMS app to the kitchen number with the order pre-filled (user taps Send).
            const href = `sms:${KITCHEN_SMS}?body=${encodeURIComponent(paystackOrderSmsText(orderItem, verified))}`
            window.setTimeout(() => {
              window.location.href = href
              onOpenChange(false)
            }, 600)
          })
          .catch((e) => {
            setPaystackError(e instanceof Error ? e.message : "Verification failed")
          })
          .finally(() => {
            setPaystackBusy(false)
          })
      }

      function onPaystackClose() {
        setPaystackBusy(false)
      }

      const handler = PaystackPop.setup({
        key: paystackPublicKey,
        email,
        amount: amountPesewas,
        currency: "GHS",
        ref,
        metadata: {
          custom_fields: [
            {
              display_name: "Item",
              variable_name: "item",
              value: item.name.slice(0, 120),
            },
          ],
        },
        callback: onPaystackSuccess,
        onClose: onPaystackClose,
      })

      handler.openIframe()
    } catch (e) {
      setPaystackError(e instanceof Error ? e.message : "Paystack error")
    } finally {
      setPaystackBusy(false)
    }
  }, [item, payEmail, payAmountGhs, verifyReference, onOpenChange, paystackPublicKey])

  if (!item) return null

  const refOk = transactionRef.trim().length >= 4
  const manualReady = paidConfirmed && refOk
  const paystackReady = Boolean(verifiedPaystack)
  const canSendOrder = paystackReady || manualReady

  const smsBody = paystackReady && verifiedPaystack
    ? paystackOrderSmsText(item, verifiedPaystack)
    : `Hello 3 Seconds Kitchen — PAID ORDER
Item: ${item.name}
Menu price: ${item.price}
Amount paid (GHS): ${amountPaid.trim() || "—"}
MoMo / payment ref: ${transactionRef.trim()}
Please confirm and prepare my order. Thank you.`

  const smsHref = `sms:${KITCHEN_SMS}?body=${encodeURIComponent(smsBody)}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pay first, then message the kitchen</DialogTitle>
          <DialogDescription>
            After Paystack payment is verified, your SMS app opens to{" "}
            <span className="font-mono font-semibold text-foreground">{PAYMENT_PHONE_DISPLAY}</span> with the order
            ready to send. MoMo payers use the button below after confirming payment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-lg border border-border bg-muted/40 p-3 text-sm">
            <p className="font-semibold text-foreground">{item.name}</p>
            <p className="text-primary font-black">{item.price}</p>
          </div>

          {fetchedPaystackPublicKey === null && !PAYSTACK_PUBLIC_KEY_BUILD ? (
            <p className="text-xs text-muted-foreground rounded-md border border-dashed p-2">
              Loading Paystack…
            </p>
          ) : paystackPublicKey ? (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-3 text-sm">
              <p className="font-bold text-foreground">Pay with Paystack</p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="pay-email">
                  Email
                </label>
                <Input
                  id="pay-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={payEmail}
                  onChange={(e) => setPayEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="pay-amount">
                  Amount (GHS)
                </label>
                <Input
                  id="pay-amount"
                  inputMode="decimal"
                  placeholder="e.g. 90"
                  value={payAmountGhs}
                  onChange={(e) => setPayAmountGhs(e.target.value)}
                />
              </div>
              {paystackError && <p className="text-sm text-destructive">{paystackError}</p>}
              {verifiedPaystack && (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Payment verified. Your SMS app should open to the kitchen—tap Send. If it did not, use the button
                  below.
                </p>
              )}
              <Button
                type="button"
                className="w-full font-black"
                disabled={paystackBusy}
                onClick={() => void openPaystack()}
              >
                {paystackBusy ? "Processing…" : "Pay with Paystack"}
              </Button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground rounded-md border border-dashed p-2">
              Add <span className="font-mono">NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</span> or{" "}
              <span className="font-mono">PAYSTACK_PUBLIC_KEY</span> (same <span className="font-mono">pk_test_…</span>{" "}
              value) in Vercel → Environment Variables, then{" "}
              <strong className="text-foreground">Redeploy</strong>. Public keys set only after deploy need a new build
              unless you use <span className="font-mono">PAYSTACK_PUBLIC_KEY</span>, which this site reads live from the
              server. If one <span className="font-mono">*.vercel.app</span> link works and another does not, check env
              scope: keys set for <strong className="text-foreground">Production</strong> only are not available on{" "}
              <strong className="text-foreground">Preview</strong> deployments—use{" "}
              <strong className="text-foreground">All Environments</strong> or share your production URL.
            </p>
          )}

          <p className="text-center text-xs font-semibold text-muted-foreground">Or pay with MoMo</p>

          <div className="rounded-lg border border-border p-3 text-sm">
            <p className="font-bold text-foreground">Mobile Money</p>
            <p className="mt-1 text-muted-foreground">
              Send to: <span className="font-mono font-semibold text-foreground">{PAYMENT_PHONE_DISPLAY}</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Use the menu amount. Save your MoMo transaction ID for the field below.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="amount-paid">
              Amount paid (GHS) — MoMo path
            </label>
            <Input
              id="amount-paid"
              inputMode="decimal"
              placeholder="e.g. 90"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              disabled={paystackReady}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="tx-ref">
              Transaction / reference ID
            </label>
            <Input
              id="tx-ref"
              placeholder="MoMo ID or Paystack ref (min. 4 characters)"
              value={transactionRef}
              onChange={(e) => setTransactionRef(e.target.value)}
              disabled={paystackReady}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-input"
              checked={paidConfirmed}
              disabled={paystackReady}
              onChange={(e) => setPaidConfirmed(e.target.checked)}
            />
            <span className="text-muted-foreground">
              I have completed MoMo payment to {PAYMENT_PHONE_DISPLAY}.
            </span>
          </label>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {canSendOrder ? (
            <Button asChild className="font-black">
              <a
                href={smsHref}
                onClick={() => {
                  onOpenChange(false)
                }}
              >
                {paystackReady ? "Open SMS to kitchen again" : "Send order to kitchen (SMS)"}
              </a>
            </Button>
          ) : (
            <Button type="button" disabled className="font-black">
              Send order to kitchen (SMS)
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
