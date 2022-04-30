// src/mocks/browser.js
import { setupWorker } from 'msw'
import { gamesHandlers } from './games.handler'
import { authHandlers } from './auth.handler'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...[...gamesHandlers, ...authHandlers])
