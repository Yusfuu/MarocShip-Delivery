import { connect } from "mongoose";
import { captureMessage } from "@sentry/node";

export const connectDB = async () => {
  const DATABASE_URL = process.env.DATABASE_URL as string;

  const connection = await connect(DATABASE_URL).catch(err => {
    const message = `😵 Error connecting to database: ${err.message}`;
    captureMessage(`Something went wrong : ${err.message}`);
    console.error(message);
    process.exit(1);
  });

  return connection;
};
