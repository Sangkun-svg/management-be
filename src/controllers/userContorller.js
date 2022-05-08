import { userService } from "../services/userService.js";

class UserController {
  static instance;
  static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  register = (data) => {
    console.log("controller register");
    const registerUser = userService.register(data);
    console.log(registerUser);
    return registerUser;
  };

  login = (address) => {
    console.log("controller login : ", address);
    const login = userService.login(address);
    return login;
  };
}

export const userController = UserController.getInstance();
