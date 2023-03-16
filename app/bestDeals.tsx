import Image from "next/image";
import Link from "next/link";
import { DealsListGame } from "@/globalTypes";
import FreeGames from "@/components/root/freeGames";
import { format } from "date-fns"; //date formatting
import getStores from "@/lib/getStores";
import ListOfDeals from "@/components/listOfDeals";

// due to lack of support from TS to async server components
const FreeGamesAny = FreeGames as any;

const fetchBestDeals = async (length: number) => {
  // fetch two pages to guarantee at least 15 good results
  // revalidate best deals every 10 minutes
  try {
    let results: DealsListGame[] = [];
    for (let i = 0; i < 2; i++) {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?pageSize=60&pageNumber=${i}`,
        { next: { revalidate: 10 * 60 } }
      );
      const responseJSON = (await response.json()) as DealsListGame[];
      results = [...results, ...responseJSON];
    }
    // filtering
    const [filteredDeals, freeGames] = filterDeals(results);
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
  // get stores
  const stores = await getStores();
  if (response) {
    const { deals, freeGames } = response;
    if (deals && deals?.length) {
      return (
        <section className="sectionToOmit">
          <FreeGamesAny freeGames={freeGames} />
          <section className="mainPageSection">
            <h2>Best Deals</h2>
            <ListOfDeals deals={deals} stores={stores} />
          </section>
        </section>
      );
    }
  }
}
