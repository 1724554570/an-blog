import { crud } from '../db/db-crud';
import { FunCommon, toJson } from './fun-common';
import { getLogger } from "../../lib/log-config";

const loggerInfo = getLogger('info');
const _crud = new crud();
const funCommon = new FunCommon();

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

    constructor(o) {
        this.tableName = 'onethink_users';
        if (o) {
            // this.userTable = o;
            this.username = o.username;
            this.userpass = o.userpass;
            this.email = o.email;
        }
    }

    save(cb) {
        const createTime = Math.floor(new Date().getTime() / 1000);
        this.createAt = this.updateAt = createTime;
        const $sql = 'insert into ' + this.tableName + ' (username,userpass,email,imgurl,device,createAt,updateAt) values (?,?,?,?,?,?,?)';
        _crud.query({ sql: $sql, data: [this.username, this.userpass, this.email, this.imgurl, this.device, this.createAt, this.updateAt] }, function (result) {
            loggerInfo.info(JSON.stringify(result));
            cb(result);
        });
    }

    getByEmail(email, cb) {
        const $sql = 'select email from ' + this.tableName + ' where email=? ';
        _crud.query({ sql: $sql, data: [email] }, function (result) {
            if (result) {
                loggerInfo.info(JSON.stringify(result));
                cb(toJson(result));
            }
        });
    }

}

    // 用户表字段
    // userTable = {
    //     // 用户ID
    //     id: 1,
    //     // 用户昵称
    //     username: '',
    //     // 用户密码
    //     userpass: '',
    //     // 用户邮箱，唯一
    //     email: '',
    //     // 用户头像
    //     imgurl: '',
    //     // 注册时候使用的设备，pc Or mobile
    //     device: '',
    //     // 创建时间
    //     createAt: '',
    //     // 更新时间(注册时候可为当前注册时间)
    //     updateAt: '',
    //     // 用户状态
    //     state: 1,
    // };