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
  delete = async (id) => {
    const result = await blogService.delete(id);
    return result;
  };
  findOneByPk = async (id) => {
    const result = await blogService.findOneByPk(id);
    return result;
  };
  findAll = async () => {
    const result = await blogService.findAll();
    return result;
  };
}
export const blogController = BlogController.getInstance();
