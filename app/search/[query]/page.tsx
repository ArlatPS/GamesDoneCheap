import { MainSearchStyled } from "@/style/search/mainStyled";
import SearchResults from "./searchResults";

export type SharkListOfSearchedTitles = {
  gameID: string;
  steamAppID: string;
  cheapest: string;
  external: string;
  thumb: string;
}[];

export default async function SearchResultsPage({
  params,
}: {
  params: { query: string };
}) {
  const searchRes = await fetch(
    `https://www.cheapshark.com/api/1.0/games?title==${params.query}`,
    { next: { revalidate: 24 * 60 * 60 } }
  );

  const searchResults = (await searchRes.json()) as SharkListOfSearchedTitles;

  return (
    <MainSearchStyled>
      <h1>
        Search results for: <span>{params.query}</span>
      </h1>
      <SearchResults results={searchResults} />
    </MainSearchStyled>
  );
}
