import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // Check for Environment Variables
  if (!process.env.JWT_KEY) {
    throw new Error("Tickets: JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Tickets: MONGO_URI must be defined");
  }

  console.log("Env variables found.");

  // MongoDB Connection
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Tickets: Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Tickets: Listening on port 3000!!!!!!!!");
  });
};

start();
