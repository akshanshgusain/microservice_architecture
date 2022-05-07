import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./src/events/listeners/order-created-listner";

const start = async () => {
  // Check for Environment Variables

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("Tickets: NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("Tickets: NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("Tickets: NATS_CLUSTER_ID must be defined");
  }
  console.log("Env variables found.");

  // MongoDB Connection
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    // Shutdown NATS Client

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => {
      natsWrapper.client.close();
    });
    process.on("SIGTERM", () => {
      natsWrapper.client.close();
    });

    new OrderCreatedListener(natsWrapper.client).listen();

    console.log("Expiration: Connected to Nats");
  } catch (err) {
    console.error(err);
  }
};

start();
