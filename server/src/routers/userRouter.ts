import express from "express";
import userController from "../controllers/userController";
import httpMiddleware from "../middlewares/HttpMiddleware";

const userRouter = express.Router();
userRouter.get('/login', userController.login);
userRouter.get('/auth', httpMiddleware.isAuth, userController.check);
export default userRouter