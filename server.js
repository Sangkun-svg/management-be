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
// app.use("/api/user", userRouter);

app.post("/api/user/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const isRegistered = true;
    return isRegistered;
  } catch (error) {
    console.error(error);
    throw new Error("user register Error");
  }
});

app.post("/api/user/login", async (req, res) => {
  try {
    let isUser = false;
    console.log("req.body : ", req.body);
    const { id, password } = req.body;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      res.send("존재하지 않는 아이디입니다. 다시 입력해주세요.");
      throw new Error("존재하지 않는 아이디입니다. 다시 입력해주세요.");
    }
    if (user.password !== password) {
      res.send("존재하지 않는 비밀번호입니다. 다시 입력해주세요.");
      throw new Error("존재하지 않는 비밀번호입니다. 다시 입력해주세요.");
    }
    console.log(isUser);
    return res.send("로그인 성공 !");
  } catch (error) {
    console.log(error);
  }
});

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
