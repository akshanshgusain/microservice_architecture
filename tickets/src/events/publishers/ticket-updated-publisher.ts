import { Publisher, Subjects, TicketUpdatedEvent } from "@sgtickets/common";

export class TicketUpdatePublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
