import { userService } from "../services/userService.js";

class UserController {
  static instance;
  static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  register = async (data) => {
    const registerUser = await userService.register(data);
    return registerUser;
  };

  login = async (address) => {
    const result = await userService.login(address);
    return result;
  };
}

export const userController = UserController.getInstance();
