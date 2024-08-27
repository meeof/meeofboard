import express from "express";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter.ts";
import commentRouter from "./routers/commentRouter.ts";

const router = express.Router();

router.use('/user', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.get('/test', (req: express.Request, res: express.Response) => {
    console.log("\x1b[35m", 'test query', "\x1b[0m")
    res.json('test success')
})
export default router;