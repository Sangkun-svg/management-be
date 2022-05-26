import express from "express";
import { blogController } from "../controllers/blogController.js";
export const blogRouter = express();

const create = (req, res, next) => {
  const result = blogController
    .create(req.body)
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};

const update = (req, res, next) => {
  const result = blogController
    .update(req.body)
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};
const deletePoster = (req, res, next) => {
  const result = blogController
    .delete(req.params.id)
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};
const findBlog = (req, res, next) => {
  const result = blogController
    .findOneByPk(req.params.id)
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};
const findAllBlogs = (req, res, next) => {
  const result = blogController
    .findAll()
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};

blogRouter.route("/create").post(create);
blogRouter.route("/getAll").get(findAllBlogs);
blogRouter.route("/:id").get(findBlog).patch(deletePoster).put(update);
