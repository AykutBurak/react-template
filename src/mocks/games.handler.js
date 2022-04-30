// src/mocks/handlers.js
import { rest } from 'msw'
import { filterByFields, games } from './fixtures/games'

const PAGE_SIZE = 10

export const gamesHandlers = [
  rest.get('/games/:page', (req, res, ctx) => {
    let clonedGames = [...games]

    if (req.url.searchParams) {
      clonedGames = filterByFields(req.url.searchParams.entries())
    }

    return res(
      ctx.status(200),
      ctx.json({
        data: clonedGames.splice(req.params.page * PAGE_SIZE, PAGE_SIZE),
      })
    )
  }),
]