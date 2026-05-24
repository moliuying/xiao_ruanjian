let Sequelize = require('sequelize');
import db from '../config/db'
let list =  db.define('list',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        video_id:  Sequelize.STRING,// 视频ID
        video_arcurl: Sequelize.BIGINT,//视频地址
        if_scrapy_over:{
            type: Sequelize.SMALLINT,
            allowNull: false,
            defaultValue: 0
        },//  视频是否采集完毕
    },
    {
        freezeTableName: true,
        tableName: 'list',
        timestamps: false,
        operatorsAliases: true
    }
);

export default list
// module.exports = user;
