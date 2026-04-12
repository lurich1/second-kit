/** Single source of truth for 3 Seconds Kitchen address & map (Fiapre, Sunyani area). */
export const BUSINESS_LOCATION = {
  /** Short label for nav / CTAs */
  shortLabel: "Fiapre · Sunyani",
  line1: "Opposite OK Pharmacy",
  line2: "Fiapre Roundabout",
  line3: "Fiapre, Sunyani, Ghana",
  /** Schema.org / structured data */
  streetAddress: "Opposite OK Pharmacy, Fiapre Roundabout",
  addressLocality: "Fiapre",
  addressRegion: "Bono Region",
  addressCountry: "GH" as const,
  /** Map center near OK Pharmacy / Fiapre roundabout (adjust if you pin the exact shop) */
  mapLat: 7.3524,
  mapLng: -2.345,
  mapZoom: 17,
} as const

export function googleMapsEmbedUrl(): string {
  const { mapLat, mapLng, mapZoom } = BUSINESS_LOCATION
  return `https://www.google.com/maps?q=${mapLat},${mapLng}&z=${mapZoom}&output=embed`
}

export function googleMapsOpenUrl(): string {
  const { mapLat, mapLng } = BUSINESS_LOCATION
  return `https://www.google.com/maps/search/?api=1&query=${mapLat},${mapLng}`
}
