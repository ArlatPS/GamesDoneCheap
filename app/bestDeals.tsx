import Image from "next/image";
import Link from "next/link";
import { DealsListItem } from "@/globalTypes";

const fetchBestDeals = async (length: number) => {
  // revalidate best deals every 10 minutes
  const response = await fetch(
    "https://www.cheapshark.com/api/1.0/deals?pageSize=60",
    { next: { revalidate: 10 * 60 } }
  );
  try {
    const responseJSON = (await response.json()) as DealsListItem[];
    // filtering
    const filteredDeals = filterDeals(responseJSON);
    console.log(filteredDeals.slice(0, length));
    return filteredDeals.slice(0, length);
  } catch {
    console.error("CHEAP SHARK API UNAVAILABLE");
  }
};

// filter out deals that don't have steamAppID and are not free
// and prevent repetitions of games (common with this API)
function filterDeals(deals: DealsListItem[]) {
  const filtered = deals.filter(
    (deal) => deal.steamAppID != null && Number(deal.salePrice) > 0
  );
  // set for checking if seen before
  const seen = new Set();
  const readyToBeDisplayed = [];
  for (let i = 0; i < filtered.length; i++) {
    if (!seen.has(filtered[i].steamAppID)) {
      seen.add(filtered[i].steamAppID);
      readyToBeDisplayed.push(filtered[i]);
    }
  }
  return readyToBeDisplayed;
}

export default async function BestDeals() {
  const deals = await fetchBestDeals(15);
  if (deals && deals?.length) {
    return (
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
    );
  }
}
