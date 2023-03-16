import { DealsListGame, StoreFromShark } from "@/globalTypes";
import { BestDealsSectionStyled, DealTableStyled } from "@/style/bestDeals";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function ListOfDeals({
  deals,
  stores,
}: {
  deals: DealsListGame[];
  stores: StoreFromShark[];
}) {
  return (
    <BestDealsSectionStyled>
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
                      alt={`store ${stores[+deal.storeID - 1].storeName} icon`}
                    />
                  </td>
                  {/* if it has steamAppID then it has nice cover, if not add class to manage the worse one */}
                  <td>
                    {deal.steamAppID !== null ? (
                      <Image
                        src={deal.thumb}
                        width={120}
                        height={45}
                        alt={deal.title}
                        placeholder={"blur"}
                        blurDataURL={"/loading.jpg"}
                      />
                    ) : null}
                  </td>
                  <td>
                    <Link href={`/game-details/${deal.gameID}`}>
                      {deal.title}
                    </Link>
                  </td>
                  <td>{deal.salePrice} $</td>
                  <td>{Math.floor(+deal.savings)}%</td>
                  <td>
                    {format(new Date(deal.lastChange * 1000), "dd/LL/yyyy")}
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
  );
}
