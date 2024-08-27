import express from "express";
import postController from "../controllers/postController.ts";
import httpMiddleware from "../middlewares/HttpMiddleware.ts";

const postRouter = express.Router();
postRouter.get('/', postController.posts);
postRouter.get('/:id', postController.post);
postRouter.post('/', httpMiddleware.isAuth, postController.create)
export default postRouter;