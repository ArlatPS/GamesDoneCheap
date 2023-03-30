import { GameFromShark } from "@/globalTypes";

export function sortUserGamesBySavings(games: {
  [key: string]: GameFromShark;
}) {
  // get the keys to create an array to then be sorted by best savings and returned
  const arrOfGames: GameFromSharkWithID[] = [];
  for (let key of Object.keys(games)) {
    let game: GameFromSharkWithID = games[key] as GameFromSharkWithID;
    game.id = key;
    arrOfGames.push(game);
  }
  arrOfGames.sort((a, b) => {
    return +b.deals[0].savings - +a.deals[0].savings;
  });
  return arrOfGames;
}
export type GameFromSharkWithID = GameFromShark & { id: string };

export function convertUserGamesWithoutSorting(games: {
  [key: string]: GameFromShark;
}) {
  const arrOfGames: GameFromSharkWithID[] = [];
  for (let key of Object.keys(games)) {
    let game: GameFromSharkWithID = games[key] as GameFromSharkWithID;
    game.id = key;
    arrOfGames.push(game);
  }
  return arrOfGames;
}
