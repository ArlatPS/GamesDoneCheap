import { GameFromShark } from "@/globalTypes";
import { format, formatDistanceToNow } from "date-fns"; //date formatting

export default function LowestPrice({ game }: { game: GameFromShark }) {
  const isLowestEver =
    game.deals[0].price == game.cheapestPriceEver.price ||
    Number(game.deals[0].price) === 0;
  return (
    <div>
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
        <h3>
          Lowest recorded price: {game.cheapestPriceEver.price}USD{" "}
          {formatDistanceToNow(new Date(game.cheapestPriceEver.date * 1000))}{" "}
          ago (
          {format(new Date(game.cheapestPriceEver.date * 1000), "dd/LL/yyyy")})
        </h3>
      )}
    </div>
  );
}
