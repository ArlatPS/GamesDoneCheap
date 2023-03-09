import { useEffect, useState } from "react";
import { ResponseFromSteam } from "@/globalTypes";

export default function SteamSection({ steamID }: { steamID: string | null }) {
  const [steamInfo, setSteamInfo] = useState("loading");
  useEffect(() => {
    async function fetchSteam() {
      if (steamID != null) {
        try {
          const res = await fetch(`/api/steam?id=${steamID}`);
          const resAfterJSON = await res.json();
          console.log(resAfterJSON);
          setSteamInfo(resAfterJSON);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchSteam();
  }, [steamID]);

  if (steamID == null) {
    return <h3>Steam Page Unavailable</h3>;
  }

  return (
    <div>
      <h1>{steamID}</h1>
    </div>
  );
}
