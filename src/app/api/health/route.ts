import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok", studioConfigured: Boolean(process.env.ATONDIX_STUDIO_SITE_TOKEN) });
}
