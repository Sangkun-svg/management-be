import express from "express";
import { userController } from "../controllers/userContorller.js";
import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  console.log("authorization : ", auth);
  // const token = req.headers.authorization.split("Bearer ")[1];
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
