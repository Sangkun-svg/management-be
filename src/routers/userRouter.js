import express from "express";
import { userController } from "../controllers/userContorller.js";
import jwt from "jsonwebtoken";
export const userRouter = express();

const register = (req, res, next) => {
  const result = userController
    .register(req.body)
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};

const login = async (req, res, next) => {
  const result = await userController
    .login(req.body)
    .then((response) => res.json(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};

const test = (req, res, next) => {
  console.log("test : ", req.headers);
  console.log("test : ", req.headers.authorization);
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: "Auth Error from authChecker" });
  }
  jwt.verify(auth, process.env.SECRET_KEY, (err) => {
    if (err) {
      res.status(401).json({ error: "Auth Error from authChecker" });
    } else {
      next();
    }
  });
};

userRouter.route("/login").post(login);
userRouter.use(test);
userRouter.route("/register").post(register);
