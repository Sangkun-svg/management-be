import sequelize, { Op, where } from "sequelize";
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
    const t = await dbConfig.transaction();
    try {
      const user = await User.create(data);
      t.commit();
    } catch (error) {
      t.rollback();
      console.error(error);
    }
  };

  validateDuplication = async (data) => {
    try {
      const { id, email } = data;
      const user = await User.findOne({
        raw: true,
        where: {
          [Op.or]: [{ id: id }, { email: email }],
        },
      });
      const isDuplicated = user === null; // TODO: Hmm.... 이게 아닌거같은데..
      if (!isDuplicated) {
        throw new Error("duplicate user info");
      }
      return isDuplicated;
    } catch (error) {
      console.log(error);
    }
  };

  setProvider = () => {
    try {
      // if complete make social login funtion then make this function
      // each flatporm set Provider column
    } catch (error) {}
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
      if (!user) {
        throw new Error("id not exist , confirm plz");
      }
      if (user.password !== password) {
        throw new Error("password is not equals");
      }
      return isUser;
    } catch (error) {
      console.log(error);
    }
  };
}

export const userService = UserService.getInstance();
