import React from "react";
import { renderWithClient, screen, waitFor } from "../../test-utils";
import "@testing-library/jest-dom";
import { server } from "mocks/server";
import { Games } from "./index";
import { GAMES_PAGE_SIZE } from "mocks/games.handler";
import userEvent from "@testing-library/user-event";
import { QueryCache, QueryClient } from "react-query";
import { games } from "mocks/fixtures/games";

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
        const loadMoreBtn = screen.getByRole("button", { name: /load more/i });
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
});
