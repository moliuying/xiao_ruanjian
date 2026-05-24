let Sequelize = require('sequelize');
import db from '../config/db'
let detail =  db.define('detail',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        uid:  Sequelize.STRING,// 视频ID
        video_arcurl: Sequelize.BIGINT,//视频地址
        comment_name: Sequelize.SMALLINT, //当前评论页数
        comment_sex: Sequelize.SMALLINT, //当前评论页数
        comment_lev: Sequelize.SMALLINT, //当前评论页数
        comment_text: Sequelize.SMALLINT, //当前评论页数
        comment_time: Sequelize.STRING, //当前评论页数
    },
    {
        freezeTableName: true,
        tableName: 'detail',
        timestamps: false,
        operatorsAliases: true
    }
);

export default detail
