import React from "react";
import { renderWithClient, screen, waitFor } from "../../test-utils";
import "@testing-library/jest-dom";
import { server } from "mocks/server";
import Games from "./index";
import { gamesMockOptions, GAMES_PAGE_SIZE } from "mocks/games.handler";
import userEvent from "@testing-library/user-event";
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
    gamesMockOptions.returnError = false;
  });

  test("should show games", async () => {
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({ queryCache });

    renderWithClient(queryClient, <Games />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      return screen.findByRole("button", { name: /load more/i });
    });

    expect(screen.getAllByTestId("game-card")).toHaveLength(GAMES_PAGE_SIZE);
  });

  test("should load more data when load more clicked", async () => {
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({ queryCache });

    renderWithClient(queryClient, <Games />);
    const user = userEvent.setup();

    await waitFor(async () => {
      await user.click(screen.getByRole("button", { name: /load more/i }));
      expect(screen.getAllByTestId("game-card")).toHaveLength(
        GAMES_PAGE_SIZE * 2
      );
    });
  });

  test("should disable load more button when there is no more data", async () => {
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({ queryCache });

    renderWithClient(queryClient, <Games />);
    const user = userEvent.setup();

    await waitFor(
      async () => {
        const loadMoreBtn = screen.getByText(/load more/i);
        const promises = [];
        let loadMoreCount = Math.ceil(games.length / GAMES_PAGE_SIZE) + 1;
        while (loadMoreCount >= 0) {
          promises.push(user.click(loadMoreBtn));
          loadMoreCount--;
        }

        await Promise.all(promises);
        return screen.findByRole("button", { name: /no more to load/i });
      },
      {
        timeout: 3000,
      }
    );

    expect(
      screen.getByRole("button", { name: /no more to load/i })
    ).toBeDisabled();
  });

  test("should navigate to the game detail page when game card clicked", async () => {
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({ queryCache });
    const firstGame = games[0];

    renderWithClient(
      queryClient,
      <Games />,
      <Route
        path={`/games/${firstGame.id}`}
        element={<div>{firstGame.id}</div>}
      />
    );
    const user = userEvent.setup();

    await waitFor(
      async () => {
        const seeDetailsBtn = screen.getByTestId(
          `details-button-${firstGame.id}`
        );
        await user.click(seeDetailsBtn);
        expect(screen.getByText(firstGame.id)).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
  });

  test("should show an error message when the query results with an error", async () => {
    gamesMockOptions.returnError = true;
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({
      queryCache,
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    renderWithClient(queryClient, <Games />);

    await waitFor(() => {
      expect(screen.getByText(/something bad happened/i)).toBeInTheDocument();
    });
  });
});
