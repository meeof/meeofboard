import {DataTypes} from 'sequelize';
import {sequelize} from "./db.ts";

const Users = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subId: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    picture: {type: DataTypes.STRING},
})
const Posts = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    header: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
});
const Comments = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.TEXT, allowNull: false},
})
Users.hasMany(Posts);
Posts.belongsTo(Users);

Posts.hasMany(Comments);
Comments.belongsTo(Posts);
Users.hasMany(Comments);
Comments.belongsTo(Users);

export {Posts, Comments, Users};