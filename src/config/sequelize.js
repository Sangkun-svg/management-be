import * as sequelize from "sequelize";

export const dbConfig = new sequelize.Sequelize(
  process.env.DB_DATABASE || "management",
  // process.env.DB_DATABASE || "management-test",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "1234",
  {
    logging: false,
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
    define: {
      timestamps: false,
      // paranoid: true,
      // underscored: true,
    },
  }
);
