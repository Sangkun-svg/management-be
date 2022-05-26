import { Blog } from "../models/blogModel.js";

class BlogService {
  static instance;
  static getInstance() {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService();
    }
    return BlogService.instance;
  }

  create = async (data) => {
    try {
      const poster = await Blog.create(data);
      return Promise.resolve(poster);
    } catch (error) {
      console.error(error);
    }
  };

  update = async (data) => {
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

  delete = async (id) => {
    try {
      const deleted = await Blog.update(
        { is_deleted: true },
        {
          where: {
            id: id,
          },
        }
      );
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  };
  findOneByPk = async (id) => {
    try {
      const poster = await Blog.findByPk(id, {
        raw: true,
      });
      return Promise.resolve(poster);
    } catch (error) {
      console.error(error);
    }
  };

  findAll = async () => {
    try {
      const posters = await Blog.findAll({ raw: true });
      return Promise.resolve(posters);
    } catch (error) {
      console.error(error);
    }
  };
}

export const blogService = BlogService.getInstance();
