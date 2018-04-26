// var client = require('../db/db.connection');
// console.log(client);

// /**
//  * 用户表模型
//  */
// function blog_users(objectModel) {
//     this.name = objectModel.name;
//     this.password = objectModel.password;
//     this.email = objectModel.email;
// }

// // 保存用户信息
// blog_users.prototype.save = function (callback) {
//     callback = callback || function (e) { }

//     var userObject = {
//         name: this.name,
//         password: this.password,
//         email: this.email
//     };

//     var getTimes = new Date().getTime();
//     console.log(getTimes);
//     userObject.createtime = Math.floor(getTimes / 1000); // 默认读取服务器时间为创建时间
//     userObject.updatetime = Math.floor(0); // 默认开始不更新
//     userObject.status = 1; // 默认用户激活

//     return callback(null, 1);
//     //打开数据库
//     client.open(function (err, db) {
//         if (err) {
//             return callback(err);//错误，返回 err 信息
//         }
//         //读取 users 集合
//         db.collection('users', function (err, collection) {
//             if (err) {
//                 client.close();
//                 return callback(err);//错误，返回 err 信息
//             }
//             //将用户数据插入 users 集合
//             collection.insert(userObject, {
//                 safe: true
//             }, function (err, resp) {
//                 client.close();
//                 if (err) {
//                     return callback(err);//错误，返回 err 信息
//                 }
//                 callback(null, resp[0]);//成功！err 为 null，并返回存储后的用户文档
//             });
//         });
//     });
// };

// blog_users.prototype.get = function (key, callback) {
//     if (!key) {
//         return callback('数据异常'); // 返回错误信息
//     }
//     client.open(function (e, db) {
//         if (e) {
//             client.close();
//             return callback(e); // 返回错误信息
//         }

//         // 以易读的方式来读取数据，使用 pretty()方法
//         var cc = db.col.find().pretty();
//         console.log(cc);
//     });
// };

// module.exports = blog_users;

var mongoose = require('mongoose')
var UsersSchema = require('../schemas/users') //拿到导出的数据集模块
var Users = mongoose.model('Users', UsersSchema) // 编译生成Movie 模型
 
module.exports = Users;


