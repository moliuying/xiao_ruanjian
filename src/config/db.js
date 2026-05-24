// let path = require('path')
// let fs = require('fs')
// import Sequelize from "sequelize"
// const sqlite3 = require('sqlite3').verbose()
//
//
//
// const Op = Sequelize.Op;
// const operatorsAliases = {
//     $eq: Op.eq,
//     $ne: Op.ne,
//     $gte: Op.gte,
//     $gt: Op.gt,
//     $lte: Op.lte,
//     $lt: Op.lt,
//     $not: Op.not,
//     $in: Op.in,
//     $notIn: Op.notIn,
//     $is: Op.is,
//     $like: Op.like,
//     $notLike: Op.notLike,
//     $iLike: Op.iLike,
//     $notILike: Op.notILike,
//     $regexp: Op.regexp,
//     $notRegexp: Op.notRegexp,
//     $iRegexp: Op.iRegexp,
//     $notIRegexp: Op.notIRegexp,
//     $between: Op.between,
//     $notBetween: Op.notBetween,
//     $overlap: Op.overlap,
//     $contains: Op.contains,
//     $contained: Op.contained,
//     $adjacent: Op.adjacent,
//     $strictLeft: Op.strictLeft,
//     $strictRight: Op.strictRight,
//     $noExtendRight: Op.noExtendRight,
//     $noExtendLeft: Op.noExtendLeft,
//     $and: Op.and,
//     $or: Op.or,
//     $any: Op.any,
//     $all: Op.all,
//     $values: Op.values,
//     $col: Op.col
// };
//
//
//
// // if(!fs.existsSync( path.join(process.cwd(), `resources`) )){
// // //     fs.mkdirSync( path.join(process.cwd(), `resources`) )
// // // }
// // // if(!fs.existsSync( path.join(process.cwd(), `resources/app`) )){
// // //     fs.mkdirSync( path.join(process.cwd(), `resources/app`) )
// // // }
//
//
// const sequelize = new Sequelize('database', null, null, {
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
// // 手动配置sqlite3，默认的不会被识别
//     dialectModule: sqlite3,
//     dialect: 'sqlite',
//     operatorsAliases,
//     // storage:  path.join(process.cwd(), `resources/app`,  `database.sqlite`)
//     storage:  path.join(process.cwd(),   `database.sqlite`)
// })
// sequelize
//     .authenticate()
//     .then(function(err) {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(function (err) {
//         console.log('Unable to connect to the database:', err);
//     });
// export default sequelize
// // module.exports = sequelize;
