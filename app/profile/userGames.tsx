"use client";

import { DealsListGame, GameFromShark, StoreFromShark } from "@/globalTypes";
import {
  convertUserGamesWithoutSorting,
  GameFromSharkWithID,
  sortUserGamesBySavings,
} from "@/lib/userLib/sortUserGamesBySavings";
import { PageControlStyled } from "@/style/allDeals/mainStyled";
import { ButtonStyled } from "@/style/button";
import {
  ListOfDealsSectionStyled,
  ListOfDealsTableStyled,
} from "@/style/listOfDeals";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function UserGames({
  userGamesIds,
  userId,
}: {
  userGamesIds: string[];
  userId: string;
}) {
  const [gamesIds, setGamesIds] = useState(userGamesIds);
  const [page, setPage] = useState(0);
  const [games, setGames] = useState<DealsListGame[]>([]);
  useEffect(() => {
    async function getPage(page: number) {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?ids=${gamesIds
          .slice(25 * page, 25 * (page + 1))
          .join(",")}`,
        { next: { revalidate: 60 * 10 } }
      );
      const games = convertUserGamesWithoutSorting(
        (await response.json()) as { [key: string]: GameFromShark }
      );
      const listToDisplay: DealsListGame[] = [];
      // prepare data to be displayed in different format
      games.forEach((game) => {
        const deal: DealsListGame = {
          dealID: game.deals[0].dealID,
          dealRating: "0",
          gameID: game.id,
          internalName: "",
          isOnSale: "0",
          lastChange: 0,
          metacriticLink: null,
          metacriticScore: "0",
          normalPrice: game.deals[0].retailPrice,
          releaseDate: 0,
          salePrice: game.deals[0].price,
          savings: game.deals[0].savings,
          steamAppID: game.info.steamAppID,
          steamRatingCount: "0",
          steamRatingPercent: "0",
          steamRatingText: null,
          storeID: game.deals[0].storeID,
          title: game.info.title,
          thumb: game.info.thumb,
        };
        listToDisplay.push(deal);
      });
      setGames(listToDisplay);
    }
    getPage(page);
  }, [page, gamesIds]);

  async function handleDeleteGame(id: string) {
    setGamesIds(gamesIds.filter((gameId) => gameId != id));
    const response = await fetch(
      `/api/remove-game-for-user?id=${id}&userId=${userId}`,
      { cache: "no-cache" }
    );
    const responseAfterJSON = await response.json();
    if (responseAfterJSON.success) {
      if (gamesIds.length % 25 == 1 && page > 0) {
        setPage((n) => n - 1);
      }
      setGamesIds(gamesIds.filter((gameId) => gameId != id));
    }
  }
  return (
    <div className="userGames">
      <ListOfDealsSectionStyled>
        <ListOfDealsTableStyled>
          <tbody>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Price</th>
              <th>Retail Price</th>
              <th>Wishlist</th>
            </tr>
            {games.length > 0
              ? games.map((game, index) => (
                  <tr key={game.dealID}>
                    {/* if it has steamAppID then it has nice cover, if not add class to manage the higher one */}
                    <td>
                      {game.steamAppID !== null ? (
                        <Image
                          src={game.thumb}
                          width={120}
                          height={45}
                          alt={game.title}
                          className={"normalImg"}
                        />
                      ) : (
                        <Image
                          src={game.thumb}
                          width={128}
                          height={184}
                          alt={game.title}
                          className={"higherImg"}
                        />
                      )}
                    </td>
                    <td>
                      <Link href={`/game-details/${game.gameID}`}>
                        {game.title}
                      </Link>
                    </td>
                    <td>{game.salePrice}$</td>
                    <td>{game.normalPrice}$</td>
                    <td>
                      <ButtonStyled
                        onClick={() => {
                          handleDeleteGame(game.gameID);
                        }}
                      >
                        Delete
                      </ButtonStyled>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </ListOfDealsTableStyled>
      </ListOfDealsSectionStyled>
      <PageControlStyled>
        <div>
          <h4>
            Page {page + 1}/{Math.max(Math.ceil(gamesIds.length / 25), 1)}
          </h4>
          <ButtonStyled
            onClick={() => {
              if (page - 1 >= 0) setPage((n) => n - 1);
            }}
          >
            Prev
          </ButtonStyled>
          <ButtonStyled
            onClick={() => {
              if (page + 1 < Math.ceil(gamesIds.length / 25))
                setPage((n) => n + 1);
            }}
          >
            Next
          </ButtonStyled>
        </div>
      </PageControlStyled>
    </div>
  );
}
