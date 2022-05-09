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
    const isValid = await userService.validateDuplication(data);
    const registerUser = isValid
      ? userService.register(data)
      : console.log("is not valid data");
    return registerUser;
  };

  login = (address) => {
    console.log("controller login : ", address);
    const login = userService.login(address);
    return login;
  };
}

export const userController = UserController.getInstance();
