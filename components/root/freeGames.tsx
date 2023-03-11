import { DealsListGame } from "@/globalTypes";

// need to fetch for better image

export default function FreeGames({
  freeGames,
}: {
  freeGames: DealsListGame[];
}) {
  if (freeGames.length == 0) {
    return (
      <div>
        <h3>No Free Games Available</h3>
      </div>
    );
  }
  return (
    <div>
      <h2>Free Games</h2>
      {freeGames.map((game) => (
        <div key={game.dealID}>
          {/* <Image /> */}
          <h4>{game.title}</h4>
        </div>
      ))}
    </div>
  );
}
