import { http } from "common/http";
import { useInfiniteQuery } from "react-query";
import { PaginatedGamesResponse } from "./games.types";

const GAMES_QUERY_KEY = "games";

function getGames({ pageParam = 0 }) {
  return http.get<unknown, PaginatedGamesResponse>(`/games/${pageParam}`);
}

export function useInfiniteGames() {
  return useInfiniteQuery(GAMES_QUERY_KEY, getGames, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
