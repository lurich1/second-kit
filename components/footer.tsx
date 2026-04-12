import Link from "next/link"
import Image from "next/image"
import { Instagram, Phone, Mail, MapPin } from "iconoir-react"
import { BUSINESS_LOCATION } from "@/lib/business-location"

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images-removebg-preview.png"
                alt="3 Seconds Kitchen"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-primary font-bold text-lg tracking-wider uppercase">3 Seconds</h3>
                <p className="text-muted-foreground text-xs tracking-widest">KITCHEN</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              Pizza, Jollof, Fried Rice, Yam Chips, Assorted Rice, Fufu, Banku, Pastries, Spaghetti & Many More. Delivery Service Available!
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Image
                src="/graphics/truck.svg"
                alt="Food Truck"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-xs font-medium">Mobile Food Truck Experience</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold mb-4 tracking-wide">QUICK LINKS</h4>
            <nav className="space-y-2">
              <Link href="#menu" className="block text-muted-foreground hover:text-primary transition-colors">
                Menu
              </Link>
              <Link href="#location" className="block text-muted-foreground hover:text-primary transition-colors">
                Location
              </Link>
              <Link href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-bold mb-4 tracking-wide">CONTACT</h4>
            <div className="space-y-3">
              <a
                href="tel:+233536991464"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                0536 991464
              </a>
              <a
                href="tel:+233246495029"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                0246 495029
              </a>
              <p className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                {BUSINESS_LOCATION.line1}
                <br />
                {BUSINESS_LOCATION.line2}
                <br />
                {BUSINESS_LOCATION.line3}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
              <p>© {new Date().getFullYear()} 3 Seconds Kitchen. All rights reserved.</p>
              <span className="hidden md:inline">•</span>
              <Link href="/impressum" className="hover:text-primary transition-colors">
                Impressum
              </Link>
              <span>•</span>
              <Link href="/datenschutz" className="hover:text-primary transition-colors">
                Datenschutz
              </Link>
              <span>•</span>
              <Link href="/agb" className="hover:text-primary transition-colors">
                AGB
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">Delivery Service Available</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
