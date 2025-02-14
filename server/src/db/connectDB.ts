import { Sequelize, importModels } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { User } from "../models/user.model.js";


export const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    dialect: PostgresDialect,
    models: [User],
});

export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");

        if (process.env.RUNTIME === "dev") {
            console.log("Development mode: Syncing tables with alter.");
            await sequelize.sync({ alter: true , force: true });
        } else {
            await sequelize.sync();
        }

        return Promise.resolve();
    } catch (error) {
        console.error("Database connection failed:", error);
        return Promise.reject(error);
    }
}
