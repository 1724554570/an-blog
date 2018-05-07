import { crud } from '../database/db-mysql';
import { toJson, extend, objToArray, trimField } from '../../lib/util';
import { getLogger } from "../../lib/log-config";
import { join } from 'path';

const loggerInfo = getLogger('info');
const loggerOth = getLogger('oth');
const _crud = new crud();

export class OnethinkUsers {
    // 用户表名称
    tableName;
    // 用户ID
    id;
    // 用户昵称
    username;
    // 用户密码
    userpass;
    // 用户邮箱，唯一
    email;
    // 用户头像
    imgurl = '';
    // 注册时候使用的设备，pc Or mobile
    device = '';
    // 创建时间
    create_at;
    // 更新时间(注册时候可为当前注册时间)
    update_at;
    // 用户状态
    state;

    // 用户表字段
    userTable = {
        // 用户ID
        // id: '',
        // 用户昵称
        username: '',
        // 用户密码
        userpass: '',
        // 用户邮箱，唯一
        email: '',
        // 用户头像
        imgurl: '',
        // 注册时候使用的设备，pc Or mobile
        device: '',
        // 创建时间
        create_at: '',
        // 更新时间(注册时候可为当前注册时间)
        update_at: '',
        // 用户状态
        // state: '',
    };

    setUserUpdate = {};

    constructor(o) {
        this.tableName = 'onethink_user';
        if (o) {
            this.username = o.username;
            this.userpass = o.userpass;
            this.email = o.email;
            if (o.setUserUpdate) {
                this.setUserUpdate = o.setUserUpdate;
            }
            this.userTable = extend(this.userTable, o.userTable, true);
        }
    }

    save(cb) {
        const createTime = Math.floor(new Date().getTime() / 1000);
        this.userTable.create_at = this.userTable.update_at = createTime;
        const Keys_ = Object.keys(trimField(this.userTable));
        const table_field_k = Keys_.toString();
        const table_field_v = ((",?").repeat(Keys_.length)).substr(1);
        const $sql = 'insert into ' + this.tableName + ' (' + table_field_k + ') values (' + table_field_v + ')';
        const insertArray = objToArray(this.userTable);
        _crud.query({ sql: $sql, data: insertArray }, function (result) {
            loggerInfo.info('save result=' + JSON.stringify(result));
            loggerInfo.info('UserTable insertArray=' + insertArray.toString());
            cb(result);
        });
    }

    update(cb) {
        const updateTime = Math.floor(new Date().getTime() / 1000);
        let updateString = [];
        let updateValue = [];
        let updateJson = this.setUserUpdate;
        let Keys_ = Object.keys(updateJson);
        loggerOth.info(Keys_.toString());
        if (Keys_.length > 0) {
            updateJson.update_at = updateTime;
            for (var key in updateJson) {
                updateString.push((key + '=?'));
                updateValue.push(updateJson[key]);
            }
        }
        updateString = updateString.join(',');
        updateValue.push(updateJson['email']);

        const $sql = 'UPDATE ' + this.tableName + ' SET ' + updateString + ' WHERE email=?';
        _crud.query({ sql: $sql, data: updateValue }, function (result) {
            loggerOth.info("update result = " + result.affectedRows);
            if (result.affectedRows > 0) {
                cb(result);
            }
        });

    }

    getByEmail(email, cb) {
        const $sql = 'select email from ' + this.tableName + ' where email=? ';
        const selectEmail = [email];
        _crud.query({ sql: $sql, data: selectEmail }, function (result) {
            loggerInfo.info('UserTable selectEmail=' + selectEmail.toString() + " Existence");
            cb(toJson(result));
        });
    }

}