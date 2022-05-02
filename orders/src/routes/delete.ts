import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../models/orders";
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@sgtickets/common";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    order.save();

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
