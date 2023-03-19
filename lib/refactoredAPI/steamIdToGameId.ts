import { ResponseFromSteam } from "@/globalTypes";

export async function steamIdToGameId(ids: number[]) {
  const gameIDs: string[] = [];

  // maximum 10 dlc - gameshark api is prone to 429
  for (let i = 0; i < 10; i++) {
    try {
      const res = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${ids[i]}`,
        { next: { revalidate: 12 * 60 * 60 } }
      );
      const resAfterJSON = await res.json();
      const steamResponse = resAfterJSON[ids[i]] as ResponseFromSteam;
      if (steamResponse.success) {
        const res = await fetch(
          `https://www.cheapshark.com/api/1.0/games?title=${steamResponse.data.name}&limit=5`,
          { next: { revalidate: 12 * 60 * 60 } }
        );
        // add first result to gameIDs
        const resAfterJ = await res.json();
        if (resAfterJ[0]) {
          console.log(resAfterJ[0].gameID);
          gameIDs.push(resAfterJ[0].gameID);
        }
      }
    } catch (e) {
      throw new Error();
    }
  }
  return gameIDs;
}
