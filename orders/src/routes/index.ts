import { requireAuth } from "@sgtickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/orders";

const router = express.Router();

router.get(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("TickerId must be provided")],
  async (req: Request, res: Response) => {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate("ticket");
    res.send(orders);
  }
);

export { router as indexOrderRouter };
