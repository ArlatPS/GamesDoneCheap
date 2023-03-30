"use client";

import { DealsListGame, GameFromShark, StoreFromShark } from "@/globalTypes";
import {
  GameFromSharkWithID,
  sortUserGamesBySavings,
} from "@/lib/userLib/sortUserGamesBySavings";
import {
  ListOfDealsSectionStyled,
  ListOfDealsTableStyled,
} from "@/style/listOfDeals";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserGames({
  userGamesIds,
}: {
  userGamesIds: string[];
}) {
  const [page, setPage] = useState(0);
  const [deals, setDeals] = useState<DealsListGame[]>([]);
  useEffect(() => {
    async function getPage(page: number) {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?ids=${userGamesIds
          .slice(0 * page, 25 * (page + 1))
          .join(",")}`,
        { next: { revalidate: 60 * 10 } }
      );
      const games = sortUserGamesBySavings(
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
      setDeals(listToDisplay);
    }
    getPage(page);
  }, [page, userGamesIds]);

  return (
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
          {deals.length > 0
            ? deals.map((deal) => (
                <tr key={deal.dealID}>
                  {/* if it has steamAppID then it has nice cover, if not add class to manage the higher one */}
                  <td>
                    {deal.steamAppID !== null ? (
                      <Image
                        src={deal.thumb}
                        width={120}
                        height={45}
                        alt={deal.title}
                        className={"normalImg"}
                      />
                    ) : (
                      <Image
                        src={deal.thumb}
                        width={128}
                        height={184}
                        alt={deal.title}
                        className={"higherImg"}
                      />
                    )}
                  </td>
                  <td>
                    <Link href={`/game-details/${deal.gameID}`}>
                      {deal.title}
                    </Link>
                  </td>
                  <td>{deal.salePrice}$</td>
                  <td>{deal.normalPrice}$</td>
                  <td>get out</td>
                </tr>
              ))
            : null}
        </tbody>
      </ListOfDealsTableStyled>
    </ListOfDealsSectionStyled>
  );
}
