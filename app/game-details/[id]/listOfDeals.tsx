import { useEffect, useState } from "react";
import { DealsList, StoreFromShark } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";

async function getStores() {
  const response = await fetch("http://localhost:3000/api/stores", {
    next: { revalidate: 24 * 60 * 60 },
  });
  console.log(response);
  const responseAfterJSON = await response.json();
  return responseAfterJSON;
}

// component with lists of deals, it needs stores list
export default async function ListOfDeals({ deals }: { deals: DealsList }) {
  // const [stores, setStores] = useState<StoreFromShark[]>([]);

  // useEffect for fetching stores when component is mounted
  // useEffect(() => {
  //   async function getStores() {
  //     const response = await fetch("/api/stores");
  //     const responseAfterJSON = await response.json();
  //     setStores(responseAfterJSON);
  //   }
  //   getStores();
  // }, []);
  const stores = (await getStores()) as StoreFromShark[];
  // console.log(stores);
  // if not fetched yet loading pane
  if (stores?.length != 0) {
    // return (
    //   <div>
    //     <p>Loading...</p>
    //   </div>
    // );

    return (
      <div>
        {deals.map((deal) => {
          const store = stores.filter(
            (store) => store.storeID === deal.storeID
          )[0];
          // if store is not active don't show the offer
          if (store.isActive == 0) {
            return null;
          }
          // deal description with link outside
          return (
            <div key={deal.dealID}>
              <Image
                src={`https://www.cheapshark.com/${store.images.logo}`}
                width={25}
                height={25}
                alt="store logo"
              />
              <h4>{store.storeName}</h4>
              {/* show savings in % with one space after coma*/}
              <h5>Savings: {Math.floor(+deal.savings * 10) / 10}%</h5>
              <Link
                href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
              >
                Check out
              </Link>
              <h5>
                offered: {deal.price} USD / retail: {deal.retailPrice} USD
              </h5>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
  return <h2>LOADING</h2>;
}
