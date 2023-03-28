import { Suspense } from "react";

import { GameFromShark } from "@/globalTypes";
import ListOfDeals from "./listOfDeals";
const ListOfDealsAsync = ListOfDeals as any;
import SteamSection from "./steamSection";
import LowestPrice from "./lowestPrice";
import Image from "next/image";
import GeneralLoader from "@/components/loaders/generalLoader";
import { MainGameDetailsStyled } from "@/style/gameDetails/mainStyled";
import AddGame from "@/components/auth/addGame";

const AddGameAsync = AddGame as any;

const SteamSectionAsync = SteamSection as any;

async function fetchDataFromShark(id: string) {
  const response = await fetch(
    `https://www.cheapshark.com/api/1.0/games?id=${id}`
  );
  const responseAfterJSON = await response.json();
  return responseAfterJSON;
}

export default async function GameDetails({
  params,
}: {
  params: { id: string };
}) {
  const gameFromShark = (await fetchDataFromShark(params.id)) as GameFromShark;
  // it doesn't need earlier return for loading - loading.tsx provides loading pane
  return (
    <MainGameDetailsStyled>
      <h1>{gameFromShark.info.title}</h1>
      <AddGameAsync id={params.id} />
      {gameFromShark.info.steamAppID === null ? (
        <section className="sectionWithoutSteam">
          <Image
            src={gameFromShark.info.thumb}
            width={300}
            height={400}
            alt={gameFromShark.info.title}
          />
          <div className="divWithLowestPrice">
            <LowestPrice game={gameFromShark} />
            <h5>Steam Page Unavailable</h5>
          </div>
        </section>
      ) : (
        <Suspense fallback={<GeneralLoader />}>
          <SteamSectionAsync
            steamID={gameFromShark.info.steamAppID}
            game={gameFromShark}
          />
        </Suspense>
      )}
      <Suspense fallback={<GeneralLoader />}>
        <ListOfDealsAsync deals={gameFromShark.deals} />
      </Suspense>
    </MainGameDetailsStyled>
  );
}
