import express from "express";
import commentController from "../controllers/commentController.ts";
import httpMiddleware from "../middlewares/HttpMiddleware.ts";

const commentRouter = express.Router();
commentRouter.post('/', httpMiddleware.isAuth, commentController.create);
commentRouter.delete('/', httpMiddleware.isAuth, commentController.delete);
commentRouter.get('/', commentController.comments);

export default commentRouter;