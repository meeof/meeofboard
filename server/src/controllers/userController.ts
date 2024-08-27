import {OAuth2Client, TokenPayload} from "google-auth-library";
const {CLIENT_ID} = process.env;
import jwt, {Secret} from 'jsonwebtoken';
import express from "express";
import {Users} from "../models";
class UserController {
    async login (req: express.Request, res: express.Response) {
        try {
            const token:string = req.headers.authorization ?? '';
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const response = ticket.getPayload();
            if (response?.iss !== 'https://accounts.google.com' && response?.aud !== CLIENT_ID)
                return res.status(400).json({ status: 'error', error: 'Bad Request' });
            const exist = await Users.findOne({
                attributes: ['id', 'subId', 'name', 'picture', 'email'],
                where: {
                    subId: response?.sub
                }
            });
            let userId = exist?.dataValues.id;
            if (!exist) {
                const user = await Users.create({
                        subId: response?.sub,
                        name: response?.name,
                        picture: response?.picture,
                        email: response?.email,},
                    {fields: ['subId', 'name', 'picture', 'email']});
                userId = user.dataValues.id
            }
            else {
               await Users.update({
                    name: response?.name,
                    picture: response?.picture,
                    email: response?.email,
                },
                {where: {subId: response?.sub}});
            }
            const newtToken = jwt.sign({
                sibId: response?.sub,
                id: userId,
            }, process.env.PRIVATE_KEY as Secret, {
                expiresIn: '1h',
                algorithm: 'HS256'
            });
            res.status(200).json(newtToken);
        } catch (err) {
            console.log(err);
        }
    }
    async check(req: express.Request, res: express.Response) {
        try {
            const user = req.body.user;
            const token = jwt.sign(
                {
                    id: user.id,
                    sibId: user.sibId,
                },
                process.env.PRIVATE_KEY as Secret,
                {algorithm: 'HS256', expiresIn: '1h'});
            res.json(token);
        } catch (error) {
            return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
        }
    }
}
export default new UserController();