export enum OrderStatus {
  // When the roder has been created, but the ticket it is trying to order has not been reserverd
  Created = "created",

  // The ticket the order is trying to reserve has already been reserved,
  // or when the user has cancelled the order.
  // The order expires before payment.
  Cancelled = "cancelled",

  // the order has successfully reserverd the ticket
  AwaitingPayment = "awaiting:payment",

  // The order has reserved the ticket and the user has provided payment
  // successfully
  Complete = "complete",
}
