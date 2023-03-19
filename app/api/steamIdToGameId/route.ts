// convert steam ids to unique gameIDs for cheapShark

//add type

import { NextResponse } from "next/server";
// export async function GET(request: Request) {
//   // get ids from search params
//   const { searchParams } = new URL(request.url);
//   const idsParams = searchParams.get("ids");
//   if (!idsParams) {
//     return NextResponse.json({ success: false, ids: [] });
//   }

//   const names: string[] = [];
//   const gameIDs: string[] = [];
//   // conversion to array of ids
//   const ids = idsParams.slice(1, idsParams.length - 2).split(",");
//   // maximum 10 dlc - gameshark api is prone to 429
//   for (let i = 0; i < 10; i++) {
//     // find name on steam API
//     const res = await fetch(`http://localhost:3000/api/steam?id=${ids[i]}`, {
//       next: { revalidate: 12 * 60 * 60 },
//     });
//     const resAfterJSON = await res.json();
//     if (resAfterJSON.success) {
//       names.push(resAfterJSON.data.name);
//       const res = await fetch(
//         `https://www.cheapshark.com/api/1.0/games?title=${resAfterJSON.data.name}&limit=5`,
//         { next: { revalidate: 12 * 60 * 60 } }
//       );
//       // add first result to gameIDs
//       const resAfterJ = await res.json();
//       if (resAfterJ[0]) {
//         gameIDs.push(resAfterJ[0].gameID);
//       }
//     }
//   }
//   return NextResponse.json({ success: true, ids: gameIDs });
// }

// //   const response = await fetch("https://www.cheapshark.com/api/1.0/stores", {
// //     next: { revalidate: 24 * 60 * 60 },
// //   });
// //   const responseJ = await response.json();
// //   return NextResponse.json({ success: false, ids: [] });
