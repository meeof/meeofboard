import jwt, {Secret} from 'jsonwebtoken';
import express from "express";
class HttpMiddleware {
    isAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const decoded = jwt.verify(req.headers.authorization ?? '', process.env.PRIVATE_KEY as Secret);
            if (!decoded) {
                return res.status(400).json({ status: 'error', error: 'Bad Request' });
            }
            req.body.user = decoded;
            next();
        } catch (error) {
            return res.status(400).json({ status: 'error', error: 'Bad Request' });
            /*res.json('Unauthorized');*/
        }
    }
}
export default new HttpMiddleware();