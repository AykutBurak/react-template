import { http } from "common/http";
import { useInfiniteQuery, useQuery } from "react-query";
import { Game, PaginatedGamesResponse } from "./games.types";

const GAMES_QUERY_KEY = "games";

function getGames({ pageParam = 0 }) {
  return http.get<unknown, PaginatedGamesResponse>(`/games/${pageParam}`);
}

function getGameById(id: string) {
  return http.get<unknown, Game>(`/game/${id}`);
}

export function useInfiniteGames() {
  return useInfiniteQuery(GAMES_QUERY_KEY, getGames, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function useGame(id: string) {
  return useQuery([GAMES_QUERY_KEY, id], () => getGameById(id));
}
