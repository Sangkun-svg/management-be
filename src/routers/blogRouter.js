import express from "express";
import { blogController } from "../controllers";
export const blogRouter = express();

const create = (req, res, next) => {
  const result = blogController
    .create(req)
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
    .update(req)
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
    .delete(req)
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
    .findOneByPk(req.param.id)
    .then((response) => res.send(response))
    .catch((err) =>
      res.status(err.status || 500).send({
        statusCode: err.status || 500,
        error_message: err.message,
      })
    );
};
const findAllBlogs = () => {
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
blogRouter.route("/update").put(update);
blogRouter.route("/delete").patch(deletePoster);
blogRouter.route("/blog/:id").get(findBlog);
blogRouter.route("/blogs").get(findAllBlogs);
