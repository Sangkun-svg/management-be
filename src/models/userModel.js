import * as Sequelize from "sequelize";
import { dbConfig } from "../config/sequelize.js";
import { userConstant } from "../constants/userConstant.js";

const { INTEGER, STRING, DATE, NOW, BOOLEAN } = Sequelize;
export const User = dbConfig.define("user", {
  no: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  id: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
  name: {
    allowNull: true,
    type: STRING,
  },
  email: {
    allowNull: true,
    type: STRING,
  },

  provider: {
    type: STRING,
    defaultValue: userConstant.DEFAULT_PROVIDER,
  },
  is_deleted: {
    defaultValue: 0,
    type: BOOLEAN,
  },
  created_at: {
    type: DATE,
    defaultValue: NOW,
  },
  updated_at: {
    type: DATE,
    defaultValue: NOW,
  },
});
