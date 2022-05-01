import React from "react";
import { renderWithClient, screen, waitFor } from "../../test-utils";
import "@testing-library/jest-dom";
import { server } from "mocks/server";
import GameDetail from "./_id";
import { QueryCache, QueryClient } from "react-query";
import { games } from "mocks/fixtures/games";
import { Route } from "react-router-dom";

describe("Games page", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test("should show detail of the game with the given id", async () => {
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({ queryCache });

    renderWithClient(
      queryClient,
      <div />,
      <Route path="/games/:id" element={<GameDetail />} />,
      [`/games/${games[0].id}`]
    );

    await waitFor(() => {
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByAltText(`Picture of ${games[0].title}`)
      ).toBeInTheDocument();
    });
  });

  test("should show error message if no id is given", async () => {
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({ queryCache });

    renderWithClient(queryClient, <GameDetail />);

    await waitFor(() => {
      expect(screen.getByText(/game not found/i)).toBeInTheDocument();
    });
  });
});
