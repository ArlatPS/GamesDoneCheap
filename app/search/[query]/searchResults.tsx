import { ListOfDealsTableStyled } from "@/style/listOfDeals";
import Image from "next/image";
import Link from "next/link";
import { SharkListOfSearchedTitles } from "./page";

export default function SearchResults({
  results,
}: {
  results: SharkListOfSearchedTitles;
}) {
  return (
    <section>
      <ListOfDealsTableStyled className="tableForSearch">
        <tbody>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
          {results.length > 0 ? (
            results.slice(0, results.length / 2).map((game) => (
              <tr key={game.gameID}>
                <td>
                  {game.steamAppID !== null ? (
                    <Image
                      src={game.thumb}
                      width={120}
                      height={45}
                      alt={game.external}
                      className={"normalImg"}
                    />
                  ) : (
                    <Image
                      src={game.thumb}
                      width={128}
                      height={184}
                      alt={game.external}
                      className={"higherImg"}
                    />
                  )}
                </td>
                <td>
                  <Link href={`/game-details/${game.gameID}`}>
                    {game.external}
                  </Link>
                </td>
                <td>{game.cheapest}$</td>
              </tr>
            ))
          ) : (
            <tr>Nothing found</tr>
          )}
        </tbody>
      </ListOfDealsTableStyled>
      <ListOfDealsTableStyled className="tableForSearch">
        <tbody>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Price</th>
          </tr>
          {results.length > 0 ? (
            results.slice(results.length / 2).map((game) => (
              <tr key={game.gameID}>
                <td>
                  {game.steamAppID !== null ? (
                    <Image
                      src={game.thumb}
                      width={120}
                      height={45}
                      alt={game.external}
                      className={"normalImg"}
                    />
                  ) : (
                    <Image
                      src={game.thumb}
                      width={128}
                      height={184}
                      alt={game.external}
                      className={"higherImg"}
                    />
                  )}
                </td>
                <td>
                  <Link href={`/game-details/${game.gameID}`}>
                    {game.external}
                  </Link>
                </td>
                <td>{game.cheapest}$</td>
              </tr>
            ))
          ) : (
            <tr>Nothing found</tr>
          )}
        </tbody>
      </ListOfDealsTableStyled>
    </section>
  );
}
