import sequelize from "sequelize";
import { User } from "../models/userModel.js";
import { dbConfig } from "../../sequelize.js";
class UserService {
  static instance;
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  register = async (data) => {
    console.log("service register");
    const t = await dbConfig.transaction();
    try {
      //   const validation = registerValidation(data);
      //   const provider = ...; -> provider funciotn : if user register from social platform write provider in database ex ] provier === kakao ? provider = kakao : local
      const user = await User.create(data);
      t.commit();
    } catch (error) {
      t.rollback();
      console.error(error);
    }
  };

  login = async (address) => {
    try {
      let isUser = false;
      const { id, password } = address;
      const user = await User.findOne({
        raw: true,
        where: {
          id: id,
        },
      });
      if (user.password === password) {
        console.log("password  equals");
        isUser = true;
      } else {
        console.log("password is not equals");
      }
      console.log("isUser : ", isUser);
      return isUser;
    } catch (error) {
      throw new Error("login is not success");
    }
  };
}

export const userService = UserService.getInstance();
