import { DealsListGame } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

function AllDealsList({
  deals,
  hasUpdated,
}: {
  deals: DealsListGame[];
  hasUpdated: boolean;
}) {
  if (hasUpdated) {
    return (
      <ol>
        {deals.length > 0 ? (
          deals.map((deal) => (
            <li key={deal.dealID}>
              <Image
                src={deal.thumb}
                width={40}
                height={60}
                alt={deal.title}
                placeholder={"blur"}
                blurDataURL={"/loading.jpg"}
              />
              {`${deal.title} || current: ${deal.salePrice} | normal: ${
                deal.normalPrice
                //*1000 to convert from milliseconds to seconds
              } | lastChange: ${new Date(deal.lastChange * 1000)}`}
              <Link href={`/game-details/${deal.gameID}`}>{deal.gameID}</Link>
            </li>
          ))
        ) : (
          <h4>No Deals found for current filters</h4>
        )}
      </ol>
    );
  }
  return <h1>WE ARE LOADING</h1>;
}
export default memo(AllDealsList);
