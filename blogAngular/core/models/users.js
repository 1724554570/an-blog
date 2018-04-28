import { crud } from '../db/db-crud';
import { toJson, extend } from '../../lib/util';
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
    createAt;
    // 更新时间(注册时候可为当前注册时间)
    updateAt;
    // 用户状态
    state;

    // 用户表字段
    userTable = {
        // 用户ID
        id: '',
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
        createAt: '',
        // 更新时间(注册时候可为当前注册时间)
        updateAt: '',
        // 用户状态
        state: '',
    };

    setUserUpdate = {};

    constructor(o) {
        this.tableName = 'onethink_users';
        if (o) {
            this.username = o.username;
            this.userpass = o.userpass;
            this.email = o.email;
            if (o.setUserUpdate) {
                this.setUserUpdate = o.setUserUpdate;
            }
            // this.userTable = extend(this.userTable, o.userTable, true);
        }
    }

    save(cb) {
        const createTime = Math.floor(new Date().getTime() / 1000);
        this.createAt = this.updateAt = createTime;
        const $sql = 'insert into ' + this.tableName + ' (username,userpass,email,imgurl,device,createAt,updateAt) values (?,?,?,?,?,?,?)';
        const insertArray = [this.username, this.userpass, this.email, this.imgurl, this.device, this.createAt, this.updateAt];
        _crud.query({ sql: $sql, data: insertArray }, function (result) {
            loggerInfo.info('UserTable insertArray=' + insertArray.toString());
            cb(result);
        });
    }

    update(cb) {
        const updateTime = Math.floor(new Date().getTime() / 1000);
        let updateString = [];
        let updateValue = [];
        let updateJson = this.setUserUpdate;
        loggerOth.info("update(cb)=" + Object.keys(updateJson).length);
        if (Object.keys(updateJson).length > 0) {
            updateJson.updateAt = updateTime;
            loggerOth.info("update(cb)=" + JSON.stringify(updateJson));
            for (var key in updateJson) {
                updateString.push((key + '=?'));
                updateValue.push('"' + updateJson[key] + '"');
            }
        }
        updateString = updateString.join(',');
        // updateValue = updateValue.join(',');
        updateValue.push('"' + updateJson['email'] + '"');
        loggerOth.info("update(cb)=" + updateString);
        loggerOth.info("update(cb)=" + updateValue);

        const $sql = 'update' + this.tableName + 'set ' + updateString + 'where email=?';
        _crud.query({ sql: $sql, data: updateValue }, function (result) {
            loggerOth.info("update(cb)=" + result);
            cb(result);
        });

    }

    getByEmail(email, cb) {
        const $sql = 'select email from ' + this.tableName + ' where email=? ';
        const selectEmail = [email];
        _crud.query({ sql: $sql, data: selectEmail }, function (result) {
            loggerInfo.info('UserTable selectEmail=' + selectEmail.toString());
            cb(toJson(result));
        });
    }

}