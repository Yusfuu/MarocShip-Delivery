import "dotenv/config";
import express from "express";
import { connectDB } from "@config/database";
import compression from "compression";
import { limiter } from "@middlewares/limiter";
import { handleError, notFound } from "@middlewares/error";
import { sentery } from "@config/sentry.server.config";
import { admin, driver, manager, deliverymanager } from "@routes/index";
import helmet from "helmet";
import { setBonusEveryMonth } from "@utils/calculate";
import { Jobs } from "@lib/jobs";
import morgan from "morgan";
import { loggerGetId, logger, loggerGetRole } from "@middlewares/logger";
import { rawBody } from "@middlewares/raw";

const job = new Jobs();
const app = express();
sentery.init(app);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);
app.use(rawBody)


app.use(sentery.requestHandler);
app.use(sentery.tracingHandler);

// init logger
morgan.token('id', loggerGetId);
morgan.token('role', loggerGetRole);
app.use(logger);

// All routes should live here
app.use("/api/admin", admin);
app.use("/api/deliverymanager", deliverymanager);
app.use("/api/manager", manager);
app.use("/api/driver", driver);

app.get("/error", () => {
  throw new Error("test error 🙃🙃");
});


// fallthrough error handler
app.use(sentery.errorHandler);

// handling 404 errors
app.use(notFound);
// // handling internal server errors
app.use(handleError);

const port = process.env.PORT || 3000;
const host = process.env.APP_HOSTNAME || "localhost";
const url = process.env.APP_URL || `http://${host}:${port}`;

// listen to port
app.listen(port, async () => {
  console.log(`🚀 Server ready at: ${url}`);
  // connect to database
  const { connection } = await connectDB();
  console.log(`👋 Connected to database successfully: ${connection.name}`);
  // run job
  job.register('0 0 1 * *', setBonusEveryMonth);
  // register job every 10 seconds '0 0 1 * *'*/10 * * * * *
});