import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/orders";

it("marks an order as cancelled", async () => {
  // create a ticket with ticket model

  const ticket = Ticket.build({
    title: "concert",
    price: 50,
  });

  ticket.save();

  const user = global.signin();
  //make a request to create an order
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket })
    .expect(201);
  //make a request to cancel the order

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  //expectatiion to make sure the thing is cancelled
  const updateOrder = await Order.findById(order.id);
  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
});
