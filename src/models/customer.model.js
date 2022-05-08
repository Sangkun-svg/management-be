import * as Sequelize from "sequelize";
import { dbConfig } from "../../sequelize.js";

const { INTEGER, STRING, DATE, NOW, BOOLEAN } = Sequelize;
export const Customers = dbConfig.define("customers", {
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
  is_deleted: {
    defaultValue: 0,
    type: BOOLEAN,
  },
  created_at: {
    type: DATE,
    defaultValue: NOW,
  },
});
