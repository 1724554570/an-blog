const db = require('../config/db-cofig');
const os = require('mongoose');
const uri = db.mongdb.urlConnection;
const options = {
    server: {
        poolSize: 5
    }
};

const connect = os.connect(uri, options, function (cb) {
    console.log(cb);
});

// 连接错误
// connect.on('error', function (error) {
//     console.log(error);
// });

module.exports = connect;
