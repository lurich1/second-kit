import { NextResponse } from "next/server"

/**
 * Returns the Paystack **public** key at request time (reads current Vercel env).
 * Client-side `process.env.NEXT_PUBLIC_*` is baked in at build — this route fixes
 * "I added the key in Vercel but the site still says it's missing" without redeploy,
 * as long as one of these is set in the project:
 * - NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY (also used at build if present)
 * - PAYSTACK_PUBLIC_KEY (server-only copy of the same pk_... value)
 */
export async function GET() {
  const publicKey =
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY?.trim() ||
    process.env.PAYSTACK_PUBLIC_KEY?.trim() ||
    ""

  return NextResponse.json(
    { publicKey },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  )
}
