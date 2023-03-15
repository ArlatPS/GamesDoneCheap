import Image from "next/image";
import Link from "next/link";
import { DealsListGame } from "@/globalTypes";
import FreeGames from "@/components/root/freeGames";
import { BestDealsSectionStyled, DealTableStyled } from "@/style/bestDeals";
import { format } from "date-fns"; //date formatting
import getStores from "@/lib/getStores";

// due to lack of support from TS to async server components
const FreeGamesAny = FreeGames as any;

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
        <section>
          <FreeGamesAny freeGames={freeGames} />
          <BestDealsSectionStyled>
            <h2>Best Deals</h2>
            <DealTableStyled>
              <tbody>
                <tr>
                  <th>Store</th>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Savings</th>
                  <th>Deal since</th>
                  <th>Deal</th>
                </tr>
                {deals.length > 0
                  ? deals.map((deal) => (
                      <tr key={deal.dealID}>
                        {/* get store icon for store id  */}
                        <td>
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
                        </td>
                        <td>
                          <Image
                            src={deal.thumb}
                            width={120}
                            height={45}
                            alt={deal.title}
                            placeholder={"blur"}
                            blurDataURL={"/loading.jpg"}
                          />
                        </td>
                        <td>
                          <Link href={`/game-details/${deal.gameID}`}>
                            {deal.title}
                          </Link>
                        </td>
                        <td>{deal.salePrice} $</td>
                        <td>{Math.floor(+deal.savings)}%</td>
                        <td>
                          {format(
                            new Date(deal.lastChange * 1000),
                            "dd/LL/yyyy"
                          )}
                        </td>
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
            </DealTableStyled>
          </BestDealsSectionStyled>
        </section>
      );
    }
  }
}
