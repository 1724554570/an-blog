import { createPool } from "mysql";
import { extend, toJson } from '../../lib/util';
import { mysqlDb } from './db-cofig';
import { getLogger } from "../../lib/log-config";



export class crud {
    pool;

    constructor() {
        // 使用连接池，提升性能
        this.pool = createPool(extend({}, mysqlDb));
        // 根据需要获取logger
        this.loggerErr = getLogger('err');
        this.loggerDbErr = getLogger('dberr');
    }

    headleError(err) {
        console.log(err);
    }

    query(o, cb) {
        this.pool.getConnection(function (err, connection) {
            connection.query(o.sql, o.data, function (err, result) {
                connection.release();
                if (err) {
                    this.loggerDbErr.error("pool.getConnection " + JSON.stringify(err));
                    return cb();
                };
                cb && cb(result);
            });
        });
    }

    insert(o, cb) {
        this.pool.getConnection(function (err, connection) {
            connection.query(o.sql, function (err, result) {
                connection.release();
                if (err) {
                    this.loggerDbErr.error(JSON.stringify(err) + "===" + insert);
                };
                cb && cb(result);
            });
        });
    }

}

