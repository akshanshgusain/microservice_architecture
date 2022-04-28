import { requireAuth } from "@sgtickets/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.get(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("TickerId must be provided")],
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as indexOrderRouter };
