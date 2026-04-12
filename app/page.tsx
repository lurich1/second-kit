import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MenuSection } from "@/components/menu-section"
import { LocationSection } from "@/components/location-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { StickyCTA } from "@/components/sticky-cta"

export default function Home() {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": "https://foodiewagon.de/#restaurant",
        "name": "3 Seconds Kitchen",
        "description": "Pizza, Jollof, Fried Rice, Yam Chips, Assorted Rice, Fufu, Banku, Pastries, Spaghetti & Many More. Delivery Service Available in Sunyani, Ghana",
        "url": "https://foodiewagon.de",
        "servesCuisine": ["Pizza", "Jollof", "Fried Rice", "Yam Chips", "Assorted Rice", "Fufu", "Banku", "Pastries", "Spaghetti", "African", "Ghanaian"],
        "priceRange": "GHS",
        "image": "https://foodiewagon.de/images-removebg-preview.png",
        "logo": "https://foodiewagon.de/images-removebg-preview.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Street, Hse no. 125/F North Ridge",
          "addressLocality": "Sunyani",
          "addressRegion": "Brong-Ahafo",
          "postalCode": "850064-8204",
          "addressCountry": "GH"
        },
        "telephone": "+233536991464",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "11:00",
            "closes": "22:00"
          }
        ],
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "GHS"
      },
      {
        "@type": "FoodEstablishment",
        "@id": "https://foodiewagon.de/#foodestablishment",
        "name": "3 Seconds Kitchen",
        "hasMenu": {
          "@type": "Menu",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Pizza",
              "description": "Small, medium, large and family pizzas with multiple topping options.",
              "hasMenuItem": []
            },
            {
              "@type": "MenuSection",
              "name": "Rice",
              "description": "Jollof, Fried Rice, Assorted Rice and specials.",
              "hasMenuItem": []
            },
            {
              "@type": "MenuSection",
              "name": "Banku, Ampesi and Shawarma",
              "description": "Traditional Ghanaian meals and shawarma options.",
              "hasMenuItem": []
            }
          ]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://foodiewagon.de/#localbusiness",
        "name": "3 Seconds Kitchen",
        "description": "Restaurant serving Pizza, Jollof, Fried Rice, Yam Chips, Assorted Rice, Fufu, Banku, Pastries, Spaghetti & Many More in Sunyani, Ghana",
        "slogan": "Fast. Fresh. Flavorful.",
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Halal Certification",
          "name": "100% Halal Certified"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://foodiewagon.de/#website",
        "url": "https://foodiewagon.de",
        "name": "3 Seconds Kitchen",
        "description": "Pizza, Jollof, Fried Rice & More in Sunyani, Ghana - Delivery Service Available",
        "publisher": {
          "@id": "https://foodiewagon.de/#restaurant"
        },
        "inLanguage": "de-DE"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <MenuSection />
        <LocationSection />
        <ContactSection />
        <Footer />
        <StickyCTA />
      </main>
    </>
  )
}
