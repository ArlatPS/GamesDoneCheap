import { useEffect, useState } from "react";
import { ResponseFromSteam } from "@/globalTypes";
import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";

import ScreenshotGallery from "./screenshotGallery";

export default function SteamSection({ steamID }: { steamID: string | null }) {
  const [steamInfo, setSteamInfo] = useState<ResponseFromSteam | "loading">(
    "loading"
  );

  // fetch steam data
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

  //checks for earlier return
  if (steamID == null) {
    return <h3>Steam Page Unavailable</h3>;
  }

  if (steamInfo === "loading") {
    return <h2>Loading...</h2>;
  }
  if (!steamInfo.success) {
    return <h3>Steam Page Unavailable</h3>;
  }

  return (
    <div>
      <h2>{steamInfo.data.short_description}</h2>
      <h5>{parse(steamInfo.data.pc_requirements.minimum)}</h5>

      {/* this dimension are original */}
      <Image
        src={steamInfo.data.header_image}
        alt={`Photo of a game with id ${steamID}`}
        width={460}
        height={215}
      />
      <ScreenshotGallery screenshots={steamInfo.data.screenshots} />
      {/* <button onClick={() => handleScreenshots("prev")}>prev</button>
      <button onClick={() => handleScreenshots("next")}>next</button> */}
      {!steamInfo.data.dlc ? null : (
        <div>
          <h4>DLC</h4>
          {/* another component and for every dlc fetch for list of games */}
          {steamInfo.data.dlc.map((dlc) => (
            <h5 key={dlc}>DLC num: {dlc}</h5>
          ))}
        </div>
      )}
    </div>
  );
}
