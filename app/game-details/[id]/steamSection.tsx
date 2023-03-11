import parse from "html-react-parser";
import Image from "next/image";

import fetchSteam from "@/lib/fetchSteam";

import ScreenshotGallery from "./screenshotGallery";
import SectionDLC from "./sectionDLC";
const SectionDLCAsync = SectionDLC as any;

export default async function SteamSection({
  steamID,
}: {
  steamID: string | null;
}) {
  // if game doesn't have steamID return Unavailable
  if (steamID == null) {
    return <h3>Steam Page Unavailable</h3>;
  }

  // async fetch
  const steamInfo = await fetchSteam(steamID);

  // earlier returns
  if (steamInfo == undefined) {
    return <h2>Loading...</h2>;
  }
  if (!steamInfo.success) {
    return <h3>Steam Page Unavailable</h3>;
  }

  return (
    <div>
      {/* these dimension are original */}
      <Image
        src={steamInfo.data.header_image}
        alt={`Photo of a game with id ${steamID}`}
        width={460}
        height={215}
      />
      <h2>{steamInfo.data.short_description}</h2>
      <h5>{parse(steamInfo.data.pc_requirements.minimum)}</h5>
      <ScreenshotGallery screenshots={steamInfo.data.screenshots} />
      <div>
        <h4>Genres</h4>
        {steamInfo.data.genres.map((genre) => (
          <h5 key={genre.id}>{genre.description}</h5>
        ))}
      </div>
      {steamInfo.data.dlc ? <SectionDLCAsync ids={steamInfo.data.dlc} /> : null}
    </div>
  );
}
