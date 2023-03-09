import { ResponseFromSteam } from "@/globalTypes";
import { NextResponse } from "next/server";

// route to handle communication with steam api
export async function GET(request: Request) {
  // get id from url
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  // if no id return
  if (id == null) {
    return NextResponse.json({ success: false, data: null });
  }
  try {
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${id}`
    );
    const resAfterJSON = await res.json();
    // to simplify response [id]
    return NextResponse.json(resAfterJSON[id] as ResponseFromSteam);
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}
