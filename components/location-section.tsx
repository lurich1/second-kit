import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Calendar } from "iconoir-react"
import { BUSINESS_LOCATION, googleMapsEmbedUrl, googleMapsOpenUrl } from "@/lib/business-location"

export function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image
              src="/graphics/truck.svg"
              alt="Food Truck"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight">LOCATION</h2>
            <Image
              src="/graphics/truck.svg"
              alt="Food Truck"
              width={64}
              height={64}
              className="h-16 w-16 object-contain transform scale-x-[-1]"
            />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find us opposite <span className="text-foreground font-semibold">OK Pharmacy</span>,{" "}
            <span className="text-foreground font-semibold">Fiapre Roundabout</span> — {BUSINESS_LOCATION.line3}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-secondary border border-border shadow-xl">
            <iframe
              title="3 Seconds Kitchen — Opposite OK Pharmacy, Fiapre Roundabout"
              src={googleMapsEmbedUrl()}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center px-3">
              <Link
                href={googleMapsOpenUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-95"
              >
                Open in Google Maps
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-card border border-border rounded-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Main Location</h3>
                  <p className="text-lg text-muted-foreground">
                    {BUSINESS_LOCATION.line1}
                    <br />
                    {BUSINESS_LOCATION.line2}
                    <br />
                    {BUSINESS_LOCATION.line3}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Delivery Service</h3>
                  <p className="text-muted-foreground">We deliver to your location. Call us to place an order!</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Contact</h3>
                  <p className="text-muted-foreground">0536 991464</p>
                  <p className="text-muted-foreground">0246 495029</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/10 border border-primary/30 rounded-xl">
              <h4 className="text-xl font-bold text-primary mb-2">Delivery Service Available</h4>
              <p className="text-foreground">
                We deliver Pizza, Jollof, Fried Rice, Yam Chips, Assorted Rice, Fufu, Banku, Pastries, Spaghetti & Many
                More!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
