// server/src/db/connectDB.ts
import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { User } from "../models/user.model.js";
import { Fund } from "../models/fund.model.js";

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  dialect: PostgresDialect,
  models: [User, Fund],
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    if (process.env.RUNTIME === "dev") {
      console.log("Development mode: Syncing tables with alter.");
      // In development, you might use force: true to recreate the tables.
      await sequelize.sync({ alter: true, force: true });
    } else {
      await sequelize.sync();
    }

    return Promise.resolve();
  } catch (error) {
    console.error("Database connection failed:", error);
    return Promise.reject(error);
  }
}