import express from "express";
import cors from "cors";
import { dbConfig } from "./config/sequelize.js";
import multer from "multer";
import morgan from "morgan";
import { userRouter, blogRouter } from "./routers/index.js";

const app = express();

const options = {
  allowedHeaders: [
    "*",
    "Origin",
    "X-Requested-With",
    "X-Custom-Header",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "authorization",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};
const upload = multer({ dest: "./upload" });
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/image", express.static("./upload"));
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

dbConfig
  .sync()
  .then(() => console.info("connected to db"))
  .catch((e) => {
    console.error("Errordb ", e);
    throw "error";
  });

export { app };
