import * as Sequelize from "sequelize";
import { dbConfig } from "./sequelize.js";

const { INTEGER, STRING } = Sequelize;
export const Customers = dbConfig.define("customers", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  age: {
    allowNull: true,
    type: INTEGER,
  },
  name: {
    allowNull: true,
    type: STRING,
  },
  image: {
    allowNull: true,
    type: STRING,
  },
  career: {
    allowNull: true,
    type: STRING,
  },
  gender: {
    allowNull: true,
    type: STRING,
  },
});
