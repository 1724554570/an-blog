import { createPool } from "mysql";

import { extend, trim, replaceSymbol } from '../../lib/util';
import { mysql } from './db-cofig';

// console.log(mysql, "mysql");
// 使用连接池，提升性能
// const pool = createPool(extend({}, mysql));

import { getLogger } from "../../lib/log-config";
// 根据需要获取logger
const loggerErr = getLogger('err');
const loggerDbErr = getLogger('dberr');



export class crud {
    pool;

    constructor() {
        this.pool = createPool(extend({}, mysql));
    }

    headleError(err) {
        console.log(err);
    }

    query(o, cb) {
        this.pool.getConnection(function (err, connection) {
            connection.query(o.sql, o.data, function (err, result) {
                connection.release();
                if (err) {
                    loggerDbErr.error(JSON.stringify(err));
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
                    loggerDbErr.error(JSON.stringify(err) + "===" + insert);
                };
                cb && cb(result);
            });
        });
    }

    toJson(o) {
        o = JSON.stringify(o);
        o = JSON.parse(o);
        return o;
    }
}

