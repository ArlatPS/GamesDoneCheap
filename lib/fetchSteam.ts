import { ResponseFromSteam } from "@/globalTypes";

export default async function fetchSteam(steamID: string) {
  if (steamID != null) {
    try {
      // revalidate steam section once per 24h
      const res = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${steamID}`,
        { next: { revalidate: 24 * 60 * 60 } }
      );
      const resAfterJSON = await res.json();
      // to simplify response [id]
      return resAfterJSON[steamID] as ResponseFromSteam;
    } catch (e) {
      console.error("Failed Steam Fetch");
    }
  }
}
