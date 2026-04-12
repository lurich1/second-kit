import type React from "react"
import type { Metadata, Viewport } from "next"
import { Oswald, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://foodiewagon.de'),
    title: {
      default: '3 Seconds Kitchen | Pizza, Jollof, Fried Rice & More in Sunyani, Ghana',
      template: '%s | 3 Seconds Kitchen'
    },
    description:
      "3 Seconds Kitchen - Pizza, Jollof, Fried Rice, Yam Chips, Assorted Rice, Fufu, Banku, Pastries, Spaghetti & Many More. Delivery Service Available in Sunyani, Ghana. Call 0536 991464 or 0246 495029",
    keywords: [
      "3 seconds kitchen",
      "3 seconds",
      "pizza sunyani",
      "jollof rice sunyani",
      "fried rice sunyani",
      "fufu sunyani",
      "banku sunyani",
      "yam chips sunyani",
      "assorted rice sunyani",
      "pastries sunyani",
      "spaghetti sunyani",
      "food delivery sunyani",
      "restaurant sunyani",
      "baakoniaba restaurant",
      "ghanaian food sunyani",
      "african food sunyani",
      "food delivery baakoniaba",
      "3 seconds kitchen sunyani"
    ],
  authors: [{ name: '3 Seconds Kitchen' }],
  creator: '3 Seconds Kitchen',
  publisher: '3 Seconds Kitchen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '3 Seconds Kitchen | Pizza, Jollof, Fried Rice & More',
    description: 'Pizza, Jollof, Fried Rice, Yam Chips, Assorted Rice, Fufu, Banku, Pastries, Spaghetti & Many More. Delivery Service Available in Sunyani, Ghana.',
    url: 'https://foodiewagon.de',
    siteName: '3 Seconds Kitchen',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images-removebg-preview.png',
        width: 1200,
        height: 630,
        alt: '3 Seconds Kitchen - Premium Halal Burgers',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3 Seconds Kitchen | Pizza, Jollof & More',
    description: 'Pizza, Jollof, Fried Rice, Yam Chips, Assorted Rice, Fufu, Banku, Pastries, Spaghetti & Many More. Delivery Service Available.',
    images: ['/images-removebg-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#dc2626",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://foodiewagon.de" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className={`${oswald.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
