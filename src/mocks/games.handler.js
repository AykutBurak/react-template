// src/mocks/handlers.js
import { rest } from "msw";
import { filterByFields, games } from "./fixtures/games";

export const GAMES_PAGE_SIZE = 24;

export const gamesHandlers = [
  rest.get("/games/:page", (req, res, ctx) => {
    let clonedGames = [...games];
    const currentPage = Number(req.params.page);

    const filterEntries = Array.from(req.url.searchParams.entries());

    if (filterEntries.length) {
      clonedGames = filterByFields(filterEntries);
    }

    return res(
      ctx.status(200),
      ctx.json({
        games: clonedGames.splice(
          currentPage * GAMES_PAGE_SIZE,
          GAMES_PAGE_SIZE
        ),
        nextPage:
          games.length >= (currentPage + 1) * GAMES_PAGE_SIZE
            ? currentPage + 1
            : undefined,
      })
    );
  }),
  rest.get("/game/:id", (req, res, ctx) => {
    const id = req.params.id;

    return res(ctx.status(200), ctx.json(games.find((game) => game.id === id)));
  }),
];
