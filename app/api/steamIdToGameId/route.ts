// convert steam ids to unique gameIDs for cheapShark

//add type

import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("ids");
  if (!id) {
    return NextResponse.json({ success: false, ids: [] });
  }
  console.log(id);
  // const body = JSON.parse(id);
  // const body = await request.text();
  const names: string[] = [];
  const gameIDs: string[] = [];
  // conversion to array of ids
  const ids = id.slice(1, id.length - 2).split(",");
  for (let i = 0; i < ids.length; i++) {
    const res = await fetch(`http://localhost:3000/api/steam?id=${ids[i]}`);
    const resAfterJSON = await res.json();
    if (resAfterJSON.success) {
      names.push(resAfterJSON.data.name);
      const res = await fetch(
        `https://www.cheapshark.com/api/1.0/games?title=${resAfterJSON.data.name}&limit=5`
      );
      const resAfterJ = await res.json();
      if (resAfterJ[0]) {
        gameIDs.push(resAfterJ[0].gameID);
      }
    }
  }
  console.log(gameIDs);
  return NextResponse.json({ success: true, ids: gameIDs });
}

//   const response = await fetch("https://www.cheapshark.com/api/1.0/stores", {
//     next: { revalidate: 24 * 60 * 60 },
//   });
//   const responseJ = await response.json();
//   return NextResponse.json({ success: false, ids: [] });
