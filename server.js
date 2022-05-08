import express from "express";
import cors from "cors";
import { dbConfig } from "./sequelize.js";
import { User } from "./src/models/userModel.js";
import multer from "multer";

import { userRouter } from "./src/routers/index.js";
const app = express();

const port = process.env.PORT || 9000;
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
app.use("/image", express.static("./upload"));
app.use("/api/user", userRouter);

app.listen(9000, () => {
  console.log(`Listening server port ${port}`);
});

dbConfig
  .sync()
  .then(() => console.info("connected to db"))
  .catch((e) => {
    console.error("Errordb ", e);
    throw "error";
  });
