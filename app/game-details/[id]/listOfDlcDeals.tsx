import { useEffect, useState } from "react";
import { DealsList, StoreFromShark } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { ListOfDealsTableStyled } from "@/style/listOfDeals";

// component with lists of deals, it needs stores list
export default function ListOfDlcDeals({ deals }: { deals: DealsList }) {
  const [stores, setStores] = useState<StoreFromShark[]>([]);

  // useEffect for fetching stores when component is mounted
  useEffect(() => {
    async function getStores() {
      const response = await fetch("/api/stores");
      const responseAfterJSON = await response.json();
      setStores(responseAfterJSON);
    }
    getStores();
  }, []);

  // if not fetched yet loading pane
  if (stores.length == 0) {
    return (
      <tr>
        <td colSpan={3}>Loading...</td>
      </tr>
    );
  }

  return (
    <>
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
          <tr key={deal.dealID}>
            <td>
              <Image
                src={`https://www.cheapshark.com/${store.images.logo}`}
                width={25}
                height={25}
                alt="store logo"
              />
            </td>
            <td>{store.storeName}</td>
            {/* show savings in % with one space after coma*/}
            <td>Savings: {Math.floor(+deal.savings * 10) / 10}%</td>
            <td>
              <Link
                href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Check out
              </Link>
            </td>
            <td>
              offered: {deal.price} USD / retail: {deal.retailPrice} USD
            </td>
          </tr>
        );
      })}
    </>
  );
}
