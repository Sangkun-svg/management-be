import sequelize, { Op, where } from "sequelize";
import { User } from "../models/userModel.js";
import { dbConfig } from "../../sequelize.js";
import bcrypt from "bcryptjs";
class UserService {
  static instance;
  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  register = async (data) => {
    const t = await dbConfig.transaction();
    try {
      const encrytedPassword = await this.encryptPassword(data.password);
      const reqRegisterInfo = {
        ...data,
        password: encrytedPassword,
      };
      const user = await User.create(reqRegisterInfo, { transaction: t });
      t.commit();
      return;
    } catch (error) {
      t.rollback();
      console.log(error);
    }
  };

  encryptPassword = async (password) => {
    try {
      const encrytedPassword = await bcrypt.hash(password, 12);
      return encrytedPassword;
    } catch (error) {
      throw new Error("encryp pw Error : ", error);
    }
  };

  setProvider = () => {
    try {
      // if complete make social login funtion then make this function
      // each flatporm set Provider column
    } catch (error) {}
  };
}

export const userService = UserService.getInstance();
