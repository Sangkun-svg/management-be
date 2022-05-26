import { blogService } from "../services/blogService.js";

class BlogController {
  static instance;
  static getInstance() {
    if (!BlogController.instance) {
      BlogController.instance = new BlogController();
    }
    return BlogController.instance;
  }
  create = async (data) => {
    await blogService.create(data);
  };
  update = async (data) => {
    await blogService.update(data);
  };
  delete = async (data) => {
    await blogService.delete(data);
  };
  findOneByPk = async (id) => {
    const result = await blogService.findOneByPk(id);
    return result;
  };
  findAll = async () => {
    await blogService.findAll();
  };
}
export const blogController = BlogController.getInstance();
