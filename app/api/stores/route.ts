// route to get stores list once a day and serve it to app
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const response = await fetch("https://www.cheapshark.com/api/1.0/stores", {
    next: { revalidate: 24 * 60 * 60 },
  });
  const responseJ = await response.json();
  return NextResponse.json(responseJ);
}
