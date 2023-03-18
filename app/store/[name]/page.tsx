import AllDealsList from "@/components/deals/allDealsList";
import { DealsListGame } from "@/globalTypes";
import getStores from "@/lib/getStores";
import { storesOfInterest, StoreOfInterest } from "@/public/storesOfInterest";
import { MainStoreStyled } from "@/style/store/mainStyled";
import Image from "next/image";
export default async function StorePage({
  params,
}: {
  params: { name: string };
}) {
  let found: StoreOfInterest = {
    storeName: "not found",
    storeID: "-1",
    storeNameDisplay: "Not Found",
    banner: {
      file: "none",
      height: 0,
      width: 0,
    },
  };

  // check if query matches stores of interest (5 big ones)
  for (let i = 0; i < storesOfInterest.length; i++) {
    if (storesOfInterest[i].storeName === params.name) {
      found = storesOfInterest[i];
    }
  }
  // if not say store not found
  if (found.storeID === "-1") {
    return (
      <MainStoreStyled>
        <h1>Store not found</h1>
      </MainStoreStyled>
    );
  }
  const stores = await getStores();
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${found.storeID}`,
    { next: { revalidate: 60 * 60 } }
  );
  const deals = (await res.json()) as DealsListGame[];

  return (
    <MainStoreStyled>
      <Image
        src={"/store-banners/steam-banner.jpg"}
        height={400}
        width={1200}
        alt={"aaa"}
      />
      <h1>Best Deals on {found.storeNameDisplay}</h1>
      <AllDealsList deals={deals} hasUpdated={true} stores={stores} />
    </MainStoreStyled>
  );
}
