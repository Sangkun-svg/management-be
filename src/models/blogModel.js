import * as Sequelize from "sequelize";
import { dbConfig } from "../config/sequelize.js";

const { INTEGER, STRING, DATE, NOW, BOOLEAN } = Sequelize;
export const Blog = dbConfig.define("blog", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER,
  },
  title: {
    allowNull: false,
    type: STRING,
  },
  writer: {
    allowNull: false,
    type: STRING,
  },
  content: {
    allowNull: false,
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
  updated_at: {
    type: DATE,
    defaultValue: NOW,
  },
});
