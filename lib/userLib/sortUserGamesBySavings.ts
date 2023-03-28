import { GameFromShark } from "@/globalTypes";

export function sortUserGamesBySavings(games: {
  [key: string]: GameFromShark;
}) {
  // get the keys to create an array to then be sorted by best savings and returned
  const arrOfGames: GameFromShark[] = [];
  for (let key of Object.keys(games)) {
    arrOfGames.push(games[key]);
  }
  arrOfGames.sort((a, b) => {
    return +b.deals[0].savings - +a.deals[0].savings;
  });
  return arrOfGames;
}
