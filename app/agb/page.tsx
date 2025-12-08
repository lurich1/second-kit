import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "iconoir-react"

export const metadata = {
  title: "Terms & Conditions | 3 Seconds Kitchen",
  description: "Terms and conditions for 3 Seconds Kitchen in Sunyani, Ghana",
}

export default function AGBPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to homepage</span>
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">3 Seconds Kitchen — Sunyani, Ghana</p>
          </div>

          <div className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary max-w-none space-y-8">
            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Scope</h2>
              <p className="text-sm text-muted-foreground">
                These terms apply to all orders placed with 3 Seconds Kitchen (FlavorBytes GmbH) for food and beverage sales, delivery, or catering services.
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Orders & Payment</h2>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Prices are shown in Ghanaian Cedi (GHS) and include applicable VAT.</li>
                <li>Payment: cash or mobile money on delivery/pickup. Catering may require a deposit.</li>
                <li>We may adjust prices; confirmed orders are honored at the agreed price.</li>
              </ul>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Delivery & Pickup</h2>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Delivery is available in Sunyani (Baakoniaba and nearby areas). Fees may apply.</li>
                <li>Delivery times are estimates; we will notify you if delays occur.</li>
                <li>Pickup location: Baakoniaba - Sunyani, Main Street, Hse no. 125/F North Ridge, 850064-8204.</li>
              </ul>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Allergens & Quality</h2>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Ask us about allergens before ordering; traces may still be present.</li>
                <li>Images may differ slightly from the delivered product.</li>
              </ul>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cancellations & Complaints</h2>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>Please report issues immediately after delivery/pickup so we can make it right.</li>
                <li>Catering cancellations within 72 hours of the event may incur up to 50% fees.</li>
              </ul>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Liability</h2>
              <p className="text-sm text-muted-foreground">
                We are liable for intent and gross negligence. For minor negligence, liability is limited to foreseeable, typical damages. Statutory product liability remains unaffected.
              </p>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Phone: <a href="tel:+233536991464" className="text-primary hover:underline">0536 991464</a> / <a href="tel:+233246495029" className="text-primary hover:underline">0246 495029</a></p>
                <p>Location: Baakoniaba - Sunyani, Main Street, Hse no. 125/F North Ridge, 850064-8204</p>
              </div>
            </section>

            <div className="text-sm text-muted-foreground text-center pt-8 border-t border-border">
              <p>Last updated: December 2025</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
