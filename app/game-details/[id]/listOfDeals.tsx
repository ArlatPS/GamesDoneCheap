import { DealsList } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import getStores from "@/lib/getStores";
import { ListOfDealsTableStyled } from "@/style/listOfDeals";
import { DealsInDetailSectionStyled } from "@/style/gameDetails/mainStyled";

// component with lists of deals, it needs stores list
export default async function ListOfDeals({ deals }: { deals: DealsList }) {
  const stores = await getStores();
  // if stores fetched return component
  if (stores?.length != 0) {
    return (
      <DealsInDetailSectionStyled>
        <h2>Deals</h2>
        <ListOfDealsTableStyled className="tableForDealsInDetails">
          <tbody>
            <tr>
              <th>Logo</th>
              <th>Key Shop</th>
              <th>Price</th>
              <th>Retail</th>
              <th>Savings</th>
              <th>Link</th>
            </tr>
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
                  <td>{deal.price}$</td>
                  <td>{deal.retailPrice}$</td>
                  {/* show savings in % with one space after coma*/}
                  <td>{Math.floor(+deal.savings * 10) / 10}%</td>
                  <td>
                    <Link
                      href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Check out
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ListOfDealsTableStyled>
      </DealsInDetailSectionStyled>
    );
  }
  // return <h2>LOADING</h2>;
}
