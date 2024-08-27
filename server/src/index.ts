import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import router from "./router";
import {sequelize} from "./db.ts";
dotenv.config();

const port = process.env.PORT || 6999;

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

const connect = async ():Promise<void> => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("\x1b[35m", 'Соединение с БД было успешно установлено', "\x1b[0m");
        app.listen(port, () => {
            console.log("\x1b[35m", `[server]: Server is running at http://localhost:${port}`, "\x1b[0m")
        });
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}
connect();


