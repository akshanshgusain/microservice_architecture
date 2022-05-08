import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sgtickets/common";
import { createChargeRouter } from "./routes/new";

const app = express();

// Settings

app.set("trust proxy", true);

// Middlewares

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", // When env is test secure cookie will be false
  })
);
app.use(currentUser);

// Routes
app.use(createChargeRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// Error handling Middleware
app.use(errorHandler);

export { app };
