import React from "react";
import { renderWithClient, screen, waitFor } from "./test-utils";
import "@testing-library/jest-dom";
import { server } from "mocks/server";
import App from "./App";
import { QueryCache, QueryClient } from "react-query";
import userEvent from "@testing-library/user-event";
import { createUser } from "mocks/fixtures/users";
import { games } from "mocks/fixtures/games";

const createdUser = createUser();

async function renderAndLogin() {
  const queryCache = new QueryCache();
  const queryClient = new QueryClient({ queryCache });
  const user = userEvent.setup();

  renderWithClient(queryClient, <App />);

  await waitFor(() => screen.findByLabelText(/username/i));
  await user.type(screen.getByLabelText(/username/i), createdUser.username);
  await user.type(screen.getByLabelText(/password/i), createdUser.password);

  await waitFor(async () => {
    await user.click(screen.getByRole("button", { name: /login/i }));
  });

  return { user };
}

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

  test("should show login page initially", async () => {
    const queryCache = new QueryCache();
    const queryClient = new QueryClient({ queryCache });

    renderWithClient(queryClient, <App />);

    await waitFor(() => screen.findByLabelText(/username/i));

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test("should navigate to games when logged in should have navbar with username and logout button", async () => {
    const { user } = await renderAndLogin();

    await waitFor(() => screen.findByAltText(`Picture of ${games[0].title}`));

    expect(
      screen.getByAltText(`Picture of ${games[0].title}`)
    ).toBeInTheDocument();

    expect(screen.getByTestId("nav-bar-username")).toHaveTextContent(
      createdUser.username
    );
    expect(screen.getByText(/my app/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(screen.getByRole("button", { name: /logout/i }));
      return screen.findByRole("alert", { name: "Goodbye" });
    });

    expect(screen.getByRole("alert", { name: "Goodbye" })).toHaveTextContent(
      /successfully logged out/i
    );

    await waitFor(() => screen.findByLabelText(/username/i));

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
