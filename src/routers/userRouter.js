import express from "express";
import { userController } from "../controllers/userContorller.js";
import { checkAuth } from "../middlewares/auth.js";
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

userRouter.route("/login").post(login);
// userRouter.use(checkAuth);
userRouter.route("/register").post(register);
