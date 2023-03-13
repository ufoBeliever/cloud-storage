import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import mongoose, { ConnectOptions } from "mongoose";
import { dbUrl } from "./consts";
import { authRouter } from "./router/auth";
import { usersRouter } from "./router/user";
import errorMiddleware from "./middlewares/error-middleware";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/docs.json";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
