import {Users} from "./models.ts";
interface IUserInfo {
    subId: string,
    name: string,
    picture: string,
    email: string,
}

export const getUserInfo = async (userId: string):Promise<IUserInfo> => {
    const user = await Users.findOne({
        attributes: ['id', 'subId', 'name', 'email', 'picture'],
        where: {
            id: userId
        }
    });
    return {
        subId: user?.dataValues.subId,
        name: user?.dataValues.name,
        picture: user?.dataValues.picture,
        email: user?.dataValues.email,
    };
}