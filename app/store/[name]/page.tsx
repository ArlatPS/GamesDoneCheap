import AllDealsList from "@/components/deals/allDealsList";
import { DealsListGame } from "@/globalTypes";
import getStores from "@/lib/getStores";
import { storesOfInterest, StoreOfInterest } from "@/public/storesOfInterest";
export default async function StorePage({
  params,
}: {
  params: { name: string };
}) {
  let found: StoreOfInterest = {
    storeName: "not found",
    storeID: "-1",
  };

  for (let i = 0; i < storesOfInterest.length; i++) {
    if (storesOfInterest[i].storeName === params.name) {
      found = storesOfInterest[i];
    }
  }
  if (found.storeID === "-1") {
    return (
      <div>
        <h1>Store not found</h1>
      </div>
    );
  }
  const stores = await getStores();
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${found.storeID}`,
    { next: { revalidate: 60 * 60 } }
  );
  const deals = (await res.json()) as DealsListGame[];

  return (
    <div>
      <h1>Best Deals on {params.name}</h1>
      <AllDealsList deals={deals} hasUpdated={true} stores={stores} />
    </div>
  );
}
