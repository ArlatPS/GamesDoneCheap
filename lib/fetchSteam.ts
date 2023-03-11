import { ResponseFromSteam } from "@/globalTypes";

export default async function fetchSteam(steamID: string) {
  if (steamID != null) {
    try {
      // revalidate steam section once per 24h
      const res = await fetch(`http://localhost:3000/api/steam?id=${steamID}`, {
        next: { revalidate: 24 * 60 * 60 },
      });
      const resAfterJSON = await res.json();
      return resAfterJSON as ResponseFromSteam;
    } catch (e) {
      console.error("Failed Steam Fetch");
    }
  }
}
