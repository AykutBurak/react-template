import React from "react";
import { waitFor, screen, renderWithClient } from "../../test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { server } from "mocks/server";
import { createUser } from "mocks/fixtures/users";
import { Login } from "./index";
import { QueryCache, QueryClient } from "react-query";
import { Route } from "react-router-dom";

const createdUser = createUser();

describe("Login", () => {
  const queryCache = new QueryCache();
  const queryClient = new QueryClient({ queryCache });

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test("should show form error message when the fields are empty", async () => {
    const user = userEvent.setup();
    renderWithClient(queryClient, <Login />);

    await user.click(screen.getByRole("button"));
    await waitFor(() => screen.findByText(/please enter your username/i));

    expect(screen.getByText(/please enter your username/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your password/i)).toBeInTheDocument();
  });

  test("should show error toast when the username or password is wrong", async () => {
    const user = userEvent.setup();
    renderWithClient(queryClient, <Login />);
    await user.type(screen.getByLabelText(/username/i), "wrong-user");
    await user.type(screen.getByLabelText(/password/i), "test");

    await waitFor(async () => {
      await user.click(screen.getByRole("button", { name: /login/i }));
      expect(screen.getByRole("alert")).toHaveTextContent("Could not login");
    });
  });

  test("should show success toast and redirect to the home page when the username or password is correct", async () => {
    const user = userEvent.setup();
    renderWithClient(
      queryClient,
      <Login />,
      <Route path="/" element={<div>Home page</div>} />
    );
    await user.type(screen.getByLabelText(/username/i), createdUser.username);
    await user.type(screen.getByLabelText(/password/i), createdUser.password);

    await waitFor(async () => {
      await user.click(screen.getByRole("button", { name: /login/i }));
      return screen.findByRole("alert", { name: "Welcome" });
    });
    expect(screen.getByRole("alert", { name: "Welcome" })).toHaveTextContent(
      createdUser.username
    );

    await waitFor(() => screen.findByText(/home page/i));

    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
