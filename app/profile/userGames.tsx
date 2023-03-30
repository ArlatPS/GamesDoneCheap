"use client";

import { DealsListGame, StoreFromShark } from "@/globalTypes";
import { GameFromSharkWithID } from "@/lib/userLib/sortUserGamesBySavings";
import {
  ListOfDealsSectionStyled,
  ListOfDealsTableStyled,
} from "@/style/listOfDeals";
import Image from "next/image";
import Link from "next/link";

export default function UserGames() {
  const deals: DealsListGame[] = [];
  const stores: StoreFromShark[] = [];
  return (
    <ListOfDealsSectionStyled>
      <ListOfDealsTableStyled>
        <tbody>
          <tr>
            <th>Store</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Price</th>
            <th>Savings</th>
            <th className="hideOnSm">Deal since</th>
            <th>Deal</th>
          </tr>
          {deals.length > 0
            ? deals.map((deal) => (
                <tr key={deal.dealID}>
                  {/* get store icon for store id  */}
                  <td>
                    {stores[+deal.storeID - 1]?.images?.logo !== undefined ? (
                      <Image
                        src={`https://www.cheapshark.com/${
                          stores[+deal.storeID - 1].images.logo
                        }`}
                        width={48}
                        height={48}
                        alt={`store ${
                          stores[+deal.storeID - 1].storeName
                        } icon`}
                      />
                    ) : null}
                  </td>
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
                  {+deal.savings >= 90 ? (
                    <td className="lowPrice">{deal.salePrice}$</td>
                  ) : (
                    <td>{deal.salePrice}$</td>
                  )}
                  <td>{Math.floor(+deal.savings)}%</td>
                  <td className="hideOnSm">get out</td>
                  <td>
                    <Link
                      href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Check Out!
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </ListOfDealsTableStyled>
    </ListOfDealsSectionStyled>
  );
}
