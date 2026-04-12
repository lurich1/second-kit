import { Phone, Mail, MapPin, Instagram } from "iconoir-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight mb-4">CONTACT</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Have questions or want to place an order? Contact us!
          </p>
        </div>

        {/* Contact Cards - Centered Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Phone Card */}
          <div className="p-8 bg-secondary rounded-2xl flex flex-col items-center text-center space-y-4 border-2 border-border hover:border-primary transition-colors">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Phone className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Phone</p>
              <a
                href="tel:+233536991464"
                className="text-xl md:text-2xl font-black text-primary hover:text-primary/80 transition-colors block mb-2"
              >
                0536 991464
              </a>
              <a
                href="tel:+233246495029"
                className="text-xl md:text-2xl font-black text-primary hover:text-primary/80 transition-colors block"
              >
                0246 495029
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Call us directly</p>
          </div>

          {/* Email Card */}
          <div className="p-8 bg-secondary rounded-2xl flex flex-col items-center text-center space-y-4 border-2 border-border hover:border-primary transition-colors">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Location</p>
              <p className="text-lg md:text-xl font-bold text-primary">
                Baakoniaba - Sunyani
              </p>
              <p className="text-sm text-primary mt-1">Main Street</p>
            </div>
            <p className="text-sm text-muted-foreground">Visit us</p>
          </div>

          {/* Instagram Card */}
          <div className="p-8 bg-secondary rounded-2xl flex flex-col items-center text-center space-y-4 border-2 border-border hover:border-primary transition-colors">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Instagram className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-2">Delivery</p>
              <p className="text-lg md:text-xl font-bold text-primary">
                Delivery Service Available
              </p>
            </div>
            <p className="text-sm text-muted-foreground">We deliver to you</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto mt-12 p-8 bg-primary/10 rounded-2xl border-2 border-primary/30 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Besuchen Sie uns</h3>
          </div>
          <p className="text-lg text-foreground mb-2">
            <strong className="text-primary">Baakoniaba - Sunyani</strong>
          </p>
          <p className="text-muted-foreground">Main Street, Hse no. 125/F North Ridge</p>
          <p className="text-muted-foreground">850064-8204</p>
          <p className="text-sm text-muted-foreground mt-4">
            <strong className="text-foreground">Delivery Service Available</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
