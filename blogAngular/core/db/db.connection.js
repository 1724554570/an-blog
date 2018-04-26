/**
 * mongodb数据库连接配置使用
 */
let cfg = require('./db.cofig');
// const mongodb = require("mongodb"),
//     Db = mongodb.Db,
//     MongoClient = mongodb.MongoClient,
//     Connect = mongodb.Connection,
//     Server = mongodb.Server,
//     settings = cfg.mongdb;

const MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

/**
 * 导出连接
 */
// module.exports = new Db(settings.db, new Server(settings.host, settings.port, db_options), { safe: true });

// const dbConnect = "mongodb://machine:123456@localhost:27017/blogAngular";
// Initialize connection once
// const connectUrl = MongoClient.connect(dbConnect, function (err, database) {
//     if (err) throw err;
//     console.log("conenct success by string of mongodb");
//     return database;
// });

// const client = new MongoClient(new Server(
//     'localhost', 27017,
//     { socketOptions: { connectTimeoutMS: 500 }, poolSize: 5, auto_reconnect: true },
//     { numberOfRetries: 3, retryMiliSeconds: 500 }
// ));



// module.exports = client;