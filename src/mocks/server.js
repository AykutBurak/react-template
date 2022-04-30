import { setupServer } from "msw/node";
import { authHandlers } from "./auth.handler";
import { gamesHandlers } from "./games.handler";

export const server = setupServer(...authHandlers, ...gamesHandlers)