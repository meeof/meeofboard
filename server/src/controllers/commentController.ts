import express from "express";
import {Comments, Posts} from "../models.ts";
import {getUserInfo} from "../utils.ts";

class CommentController {
    async comments (req: express.Request, res: express.Response) {
        try {
            const comments = await Comments.findAll({
                attributes: ['id', 'userId', "text", "createdAt"],
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    postId: req.query.postId
                }
            });
            const result = await Promise.all(comments.map(async (comment) => {
                const response = {
                    id: comment?.dataValues.id,
                    text: comment?.dataValues.text,
                    createdAt: comment?.dataValues.createdAt,
                    userId: comment?.dataValues.userId,
                }
                const user = await getUserInfo(comment?.dataValues.userId)
                return {...response, ...user}
            }))
            setTimeout(() => {res.json(result);}, 300)
        } catch (err) {
            return res.status(500).json({status: 'error', error: 'Internal Server Error'});
        }
    }
    async create (req: express.Request, res: express.Response) {
        try {
            const user = req.body.user;
            const text = req.body.text;
            const postId = req.body.postId;
            if (text.trim() !== '') {
                await Comments.create(
                    {
                        userId: user.id,
                        postId,
                        text
                    },
                    {fields: ['userId', 'text', 'postId']}
                )
                res.json('success');
            } else {
                res.json('fail');
            }
        } catch (err) {
            return res.status(500).json({status: 'error', error: 'Internal Server Error'});
        }
    }
    async delete (req: express.Request, res: express.Response) {
        try {
            const user = req.body.user;
            await Comments.destroy(
                {
                    where: {
                        id: req.query.id,
                        userId: user.id
                    }
                },
            )
            res.json('deleted');
        } catch (err) {
            return res.status(500).json({status: 'error', error: 'Internal Server Error'});
        }
    }
}

export default new CommentController();