import Image from "next/image";
import Link from "next/link";
import { SharkListOfSearchedTitles } from "./page";

export default function SearchResults({
  results,
}: {
  results: SharkListOfSearchedTitles;
}) {
  return (
    <div>
      <ul>
        {results.length > 0 ? (
          results.map((game) => (
            <li key={game.gameID}>
              <Image
                src={game.thumb}
                width={40}
                height={60}
                alt={game.external}
                placeholder={"blur"}
                blurDataURL={"/loading.jpg"}
              />
              <Link href={`/game-details/${game.gameID}`}>
                {game.external} at {game.cheapest}$
              </Link>
            </li>
          ))
        ) : (
          <h4>Nothing found</h4>
        )}
      </ul>
    </div>
  );
}
