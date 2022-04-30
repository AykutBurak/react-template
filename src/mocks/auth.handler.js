// src/mocks/handlers.js
import { rest } from "msw";
import { auth, login } from "./fixtures/auth";

export const authHandlers = [
  rest.post("/login", (req, res, ctx) => {
    const user = login(req.body);

    if (!user) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Wrong username or password",
        })
      );
    }

    sessionStorage.setItem("is-auth", "true");
    sessionStorage.setItem("username", user.username);

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        username: user.username,
      })
    );
  }),

  rest.get("/user", (req, res, ctx) => {
    if (!auth.isAuth) {
      return res(
        ctx.status(204),
        ctx.json({
          message: "Not logged in",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        username: auth.username,
      })
    );
  }),

  rest.post("/logout", (req, res, ctx) => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("is-auth");

    return res(
      ctx.status(200),
      ctx.json({
        message: "Successfully logged out",
      })
    );
  }),
];
