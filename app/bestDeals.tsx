import Image from "next/image";
import Link from "next/link";
import { DealsListGame } from "@/globalTypes";
import FreeGames from "@/components/root/freeGames";

const fetchBestDeals = async (length: number) => {
  // revalidate best deals every 10 minutes
  const response = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?pageSize=60",
    { next: { revalidate: 10 * 60 } }
  );
  try {
    const responseJSON = (await response.json()) as DealsListGame[];
    // filtering
    const [filteredDeals, freeGames] = filterDeals(responseJSON);
    console.log(filteredDeals.slice(0, length));
    return { deals: filteredDeals.slice(0, length), freeGames };
  } catch {
    console.error("CHEAP SHARK API UNAVAILABLE");
  }
};

// filter out deals that don't have steamAppID and are not free
// and prevent repetitions of games (common with this API)
// also return free games (which can be repeated - offers from different stores)
function filterDeals(deals: DealsListGame[]) {
  const filtered: DealsListGame[] = [];
  const free: DealsListGame[] = [];
  deals.forEach((deal) => {
    if (deal.steamAppID != null) {
      if (Number(deal.salePrice) > 0) {
        filtered.push(deal);
      } else {
        free.push(deal);
      }
    }
  });
  // set for checking if seen before
  const seen = new Set();
  const readyToBeDisplayed = [];
  for (let i = 0; i < filtered.length; i++) {
    if (!seen.has(filtered[i].steamAppID)) {
      seen.add(filtered[i].steamAppID);
      readyToBeDisplayed.push(filtered[i]);
    }
  }
  return [readyToBeDisplayed, free];
}

export default async function BestDeals() {
  const response = await fetchBestDeals(15);
  if (response) {
    const { deals, freeGames } = response;
    if (deals && deals?.length) {
      return (
        <section>
          <FreeGames freeGames={freeGames} />
          <div>
            <h2>Best Deals</h2>
            <ol>
              {deals.length > 0
                ? deals.map((deal) => (
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
                      <Link href={`/game-details/${deal.gameID}`}>
                        {deal.gameID}
                      </Link>
                    </li>
                  ))
                : null}
            </ol>
          </div>
        </section>
      );
    }
  }
}
