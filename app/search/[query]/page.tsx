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
    `https://www.cheapshark.com/api/1.0/games?title==${params.query}`
  );

  const searchResults = (await searchRes.json()) as SharkListOfSearchedTitles;

  return (
    <div>
      <h1>Search results for {params.query}</h1>
      <SearchResults results={searchResults} />
    </div>
  );
}
