import { GameFromShark } from "@/globalTypes";
import { DivForLowestPiceStyled } from "@/style/gameDetails/mainStyled";
import { format, formatDistanceToNow } from "date-fns"; //date formatting

export default function LowestPrice({ game }: { game: GameFromShark }) {
  const isLowestEver =
    game.deals[0].price == game.cheapestPriceEver.price ||
    Number(game.deals[0].price) === 0;
  return (
    <DivForLowestPiceStyled>
      {isLowestEver ? (
        <div>
          <h3>Historical Low 😍</h3>
          <h3>The price is currently at all time low</h3>
          <h5>
            Last time at this price{" "}
            {formatDistanceToNow(new Date(game.cheapestPriceEver.date * 1000))}{" "}
            ago
          </h5>
        </div>
      ) : (
        <div>
          <h3>
            Lowest recorded price: <span>{game.cheapestPriceEver.price}$</span>
          </h3>
          <h4>
            {formatDistanceToNow(new Date(game.cheapestPriceEver.date * 1000))}{" "}
            ago (
            {format(new Date(game.cheapestPriceEver.date * 1000), "dd/LL/yyyy")}
            )
          </h4>
        </div>
      )}
    </DivForLowestPiceStyled>
  );
}
