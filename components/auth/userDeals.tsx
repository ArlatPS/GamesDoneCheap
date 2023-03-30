import { DealsListGame, GameFromShark } from "@/globalTypes";
import getStores from "@/lib/getStores";
import { getUserGamesIds } from "@/lib/userLib/getUserGamesIds";
import {
  GameFromSharkWithID,
  sortUserGamesBySavings,
} from "@/lib/userLib/sortUserGamesBySavings";
import { UserDealsStyled } from "@/style/auth/userDeals";
import { ListOfDealsSectionStyled } from "@/style/listOfDeals";
import { currentUser, SignedIn } from "@clerk/nextjs/app-beta";
import ListOfDeals from "../listOfDeals";

export default async function UserDeals() {
  const user = await currentUser();
  let userGamesIds: string[] = [];
  let games: GameFromSharkWithID[] = [];
  let listToDisplay: DealsListGame[] = [];
  const stores = await getStores();
  if (user !== null) {
    userGamesIds = await getUserGamesIds(user.id);
    // if userGameIds not empty then fetch first 25 (max for one fetch to this API) from Shark
    if (userGamesIds.length > 0) {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?ids=${userGamesIds
          .slice(0, 25)
          .join(",")}`,
        { next: { revalidate: 60 * 10 } }
      );
      // sort
      games = sortUserGamesBySavings(
        (await response.json()) as { [key: string]: GameFromShark }
      );
      // prepare data to be displayed in different format
      games.forEach((game) => {
        const deal: DealsListGame = {
          dealID: game.deals[0].dealID,
          dealRating: "0",
          gameID: game.id,
          internalName: "",
          isOnSale: "0",
          lastChange: 0,
          metacriticLink: null,
          metacriticScore: "0",
          normalPrice: game.deals[0].retailPrice,
          releaseDate: 0,
          salePrice: game.deals[0].price,
          savings: game.deals[0].savings,
          steamAppID: game.info.steamAppID,
          steamRatingCount: "0",
          steamRatingPercent: "0",
          steamRatingText: null,
          storeID: game.deals[0].storeID,
          title: game.info.title,
          thumb: game.info.thumb,
        };
        listToDisplay.push(deal);
      });
    }
  }
  return (
    <UserDealsStyled>
      <SignedIn>
        <h2>Deals for {user?.username}</h2>
        {listToDisplay.length == 0 ? (
          <ListOfDealsSectionStyled>
            <div className="addGamesInfo">
              <h3>Add some games to your wishlist </h3>{" "}
              <h4>(best deals for them will be displayed here)</h4>
            </div>
          </ListOfDealsSectionStyled>
        ) : (
          <ListOfDeals
            deals={listToDisplay}
            stores={stores}
            optionalClassName="listOfUserDeals"
          />
        )}
      </SignedIn>
    </UserDealsStyled>
  );
}
