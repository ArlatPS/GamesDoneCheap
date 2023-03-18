import Image from "next/image";

import fetchSteam from "@/lib/fetchSteam";

import ScreenshotGallery from "./screenshotGallery";
import SectionDLC from "./sectionDLC";
import Link from "next/link";
import GeneralLoader from "@/components/loaders/generalLoader";
import LowestPrice from "./lowestPrice";
import { GameFromShark } from "@/globalTypes";
import { SteamSectionStyled } from "@/style/gameDetails/steamSection";
import Requirements from "./requirements";
const SectionDLCAsync = SectionDLC as any;

export default async function SteamSection({
  steamID,
  game,
}: {
  steamID: string;
  game: GameFromShark;
}) {
  // async fetch
  const steamInfo = await fetchSteam(steamID);

  // earlier returns
  if (steamInfo == undefined) {
    return <GeneralLoader />;
  }
  if (!steamInfo.success) {
    return <h3>Steam Page Unavailable</h3>;
  }
  return (
    <SteamSectionStyled>
      <div className="firstRow">
        <Image
          src={steamInfo.data.header_image}
          alt={`Photo of a game with id ${steamID}`}
          width={460}
          height={215}
        />
        <div>
          <h3>{steamInfo.data.short_description}</h3>
          <h3>Release Date: {steamInfo.data.release_date.date}</h3>
          {steamInfo.data.metacritic ? (
            <Link
              href={steamInfo.data.metacritic.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Metacritic: {steamInfo.data.metacritic.score}
            </Link>
          ) : null}
        </div>
      </div>

      <div className="secondRow">
        <div>
          <h4>Developer: {steamInfo.data.developers[0]}</h4>
          <h4>Publisher: {steamInfo.data.publishers[0]}</h4>
          <h4>Windows: {steamInfo.data.platforms.windows ? "🟢" : "❌"}</h4>
          <h4>Mac: {steamInfo.data.platforms.mac ? "🟢" : "❌"}</h4>
          <h4>Linux: {steamInfo.data.platforms.linux ? "🟢" : "❌"}</h4>
          <Requirements requirements={steamInfo.data.pc_requirements} />
        </div>
        <ScreenshotGallery screenshots={steamInfo.data.screenshots} />
      </div>
      <div>
        <h4>Genres</h4>
        {steamInfo.data.genres.map((genre) => (
          <h5 key={genre.id}>{genre.description}</h5>
        ))}
      </div>
      {/* maximum 10 dlc - gameshark api is prone to 429 */}

      {steamInfo.data.dlc ? (
        <SectionDLCAsync ids={steamInfo.data.dlc.slice(0, 10)} />
      ) : null}
      <LowestPrice game={game} />
    </SteamSectionStyled>
  );
}
