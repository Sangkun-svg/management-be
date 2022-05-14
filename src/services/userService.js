import sequelize, { Op, where } from "sequelize";
import { User } from "../models/userModel.js";
import { dbConfig } from "../../sequelize.js";
import { jwtConfig } from "../config/jwtConfig.js";
import { message } from "../constants/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
      const validateResult = await this.validateDuplicate(data.id);
      if (!validateResult) {
        throw new Error("id validate error occur");
      }
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
      console.error(error);
    }
  };
  validateDuplicate = async (id) => {
    try {
      let validateResult = true;
      const user = await User.findOne({
        raw: true,
        where: {
          id: id,
        },
      });
      if (user !== null) {
        validateResult = false;
      }
      return validateResult;
    } catch (error) {
      console.error(error);
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

  login = async (address) => {
    try {
      const user = await User.findOne({
        raw: true,
        where: {
          id: address.id,
        },
      });
      if (!user)
        // id is not defind
        return {
          status: 403,
          message: message.idNotEquals,
        };

      const isMatch = await this.comparePassword(
        // password is not compare
        address.password,
        user.password
      );
      if (!isMatch)
        return {
          status: 403,
          message: message.passwordNotEquals,
        };

      const token = this.signToken(user);
      return {
        status: 200,
        token: token,
      };
    } catch (error) {
      console.error(error);
    }
  };

  comparePassword = async (inputPassword, findPassword) => {
    try {
      const isMatch = await bcrypt.compare(inputPassword, findPassword);
      return isMatch;
    } catch (error) {
      console.error(error);
    }
  };

  signToken = (data) => {
    try {
      const token = jwt.sign(
        {
          no: data.no,
          id: data.id,
        },
        jwtConfig.secretKey,
        jwtConfig.option
      );
      return token;
    } catch (error) {
      console.error(error);
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
