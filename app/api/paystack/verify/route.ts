import { NextResponse } from "next/server"

type PaystackVerifyData = {
  status?: string
  reference?: string
  amount?: number
  currency?: string
}

type PaystackVerifyJson = {
  status: boolean
  message?: string
  data?: PaystackVerifyData
}

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY
  if (!secret) {
    return NextResponse.json({ ok: false, error: "PAYSTACK_SECRET_KEY is not set" }, { status: 500 })
  }

  let reference: string
  try {
    const body = (await request.json()) as { reference?: string }
    reference = (body.reference ?? "").trim()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 })
  }

  if (!reference) {
    return NextResponse.json({ ok: false, error: "Missing reference" }, { status: 400 })
  }

  const url = `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${secret}`,
    },
    next: { revalidate: 0 },
  })

  const json = (await res.json()) as PaystackVerifyJson

  if (!json.status || !json.data) {
    return NextResponse.json(
      { ok: false, error: json.message ?? "Verification failed" },
      { status: 400 },
    )
  }

  if (json.data.status !== "success") {
    return NextResponse.json({ ok: false, error: "Payment was not successful" }, { status: 400 })
  }

  const amountMinor = json.data.amount ?? 0
  const currency = json.data.currency ?? "GHS"
  const amountMain = amountMinor / 100

  return NextResponse.json({
    ok: true,
    reference: json.data.reference ?? reference,
    amountMinor,
    amountDisplay: currency === "GHS" ? amountMain.toFixed(2) : String(amountMain),
    currency,
  })
}
