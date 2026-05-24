let Sequelize = require('sequelize');
import db from '../config/db'
let user =  db.define('user',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        parentId:  Sequelize.BIGINT,//用户名
        name:  Sequelize.STRING,//用户名
        desc:  Sequelize.STRING,//描述
        update_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        create_time: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        is_delete: {
            type: Sequelize.INTEGER,
            defaultValue: 0,//默认值是0
        }
    },
    {
        freezeTableName: true,
        tableName: 'user',
        timestamps: false,
        operatorsAliases: true
    }
);

export default user
// module.exports = user;
