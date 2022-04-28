import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "@sgtickets/common";
import mongoose from "mongoose";
import { Ticket } from "../models/ticket";
import { Order } from "../models/orders";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TickerId must be provided"),
  ],
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
