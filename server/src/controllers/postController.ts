import express from "express";
import {Posts} from "../models.ts";
import {getUserInfo} from "../utils.ts";
class PostController {
    async posts(req: express.Request, res: express.Response) {
        try {
            const posts = await Posts.findAll({
                attributes: ['id', 'userId', "text", 'header', "createdAt"],
                order: [
                    ['id', 'DESC'],
                ],
            });
            const result = await Promise.all(posts.map(async (post) => {
                const response = {
                    id: post?.dataValues.id,
                    text: post?.dataValues.text,
                    header: post?.dataValues.header,
                    createdAt: post?.dataValues.createdAt,
                    userId: post?.dataValues.userId,
                }
                const user = await getUserInfo(post?.dataValues.userId)
                return {...response, ...user}
            }))
            setTimeout(() => {res.json(result);}, 200)
        } catch (error) {
            return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }
    async post(req: express.Request, res: express.Response){
        try {
            const post = await Posts.findOne({
                attributes: ['id', 'userId', "text", 'header', "createdAt"],
                where: {
                    id: req.params.id
                }
            });
            const response = {
                id: post?.dataValues.id,
                text: post?.dataValues.text,
                header: post?.dataValues.header,
                createdAt: post?.dataValues.createdAt,
                userId: post?.dataValues.userId,
            }
            const user = await getUserInfo(post?.dataValues.userId)
            setTimeout(() => {res.json({...response, ...user});}, 200)
        } catch (err) {
            return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }
    async create(req: express.Request, res: express.Response) {
        try {
            const user = req.body.user;
            const text = req.body.text;
            const header = req.body.header;
            if (text.trim() !== '' && header.trim() !== '') {
                await Posts.create(
                    {
                        userId: user.id,
                        header,
                        text
                    },
                    {fields: ['userId', 'header', 'text']}
                )
                res.json('success');
            } else {
                res.json('fail');
            }
        } catch (error) {
            return res.status(500).json({status: 'error', error: 'Internal Server Error'});
        }
    }
}

export default new PostController();