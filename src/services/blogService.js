import { Blog } from "../models";

class BlogService {
  static instance;
  static getInstance() {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService();
    }
    return BlogService.instance;
  }

  createPost = async (data) => {
    try {
      const poster = await Blog.create(data);
      return Promise.resolve(poster);
    } catch (error) {
      console.error(error);
    }
  };

  updatePost = async (data) => {
    try {
      const updated = await Blog.update(data, {
        where: {
          id: data.id,
        },
      });
      return Promise.resolve(updated);
    } catch (error) {
      console.error(error);
    }
  };

  deletePost = async (data) => {
    try {
      const deleted = await Blog.update(
        { is_deleted: true },
        {
          where: {
            id: data.id,
          },
        }
      );
      console.log("deleted : ", deleted);
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  };
  findOneByPosterId = async (id) => {
    try {
      const poster = await Blog.findByPk(id, {
        raw: true,
      });
      console.log("findOneByPk poster : ", poster);
      return Promise.resolve(poster);
    } catch (error) {
      console.error(error);
    }
  };

  findAllPosters = async (data) => {
    try {
      const posters = await Blog.findAll({ raw: true });
      console.log("find All posters : ", posters);
      return Promise.resolve(posters);
    } catch (error) {
      console.error(error);
    }
  };
}

export const blogService = BlogService.getInstance();
