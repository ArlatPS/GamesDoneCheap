import parse from "html-react-parser";
import Image from "next/image";

import fetchSteam from "@/lib/fetchSteam";

import ScreenshotGallery from "./screenshotGallery";
import SectionDLC from "./sectionDLC";
import Link from "next/link";
const SectionDLCAsync = SectionDLC as any;

export default async function SteamSection({ steamID }: { steamID: string }) {
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
      {steamInfo.data.metacritic ? (
        <Link
          href={steamInfo.data.metacritic.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <h2>Metacritic: {steamInfo.data.metacritic.score}</h2>
        </Link>
      ) : null}
      <h2>Release Date: {steamInfo.data.release_date.date}</h2>
      <h2>{steamInfo.data.short_description}</h2>
      <h3>Developer: {steamInfo.data.developers[0]}</h3>
      <h3>Publisher: {steamInfo.data.publishers[0]}</h3>
      <h4>Windows: {steamInfo.data.platforms.windows ? "🟢" : "❌"}</h4>
      <h4>Mac: {steamInfo.data.platforms.mac ? "🟢" : "❌"}</h4>
      <h4>Linux: {steamInfo.data.platforms.linux ? "🟢" : "❌"}</h4>
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
