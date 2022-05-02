import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/orders";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@sgtickets/common";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({
      ticketId: ticketId,
    })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  // Create a ticket and save it to the db
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  // Create Order

  const order = Order.build({
    ticket,
    userId: "asfafga",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });

  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});
