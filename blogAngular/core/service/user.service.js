import Sequelize from "sequelize";
import User from '../model/User.model';
import { getLogger } from "../../lib/log-config";
import { SymbolUuid,toJson } from '../../lib/util';

const db_log = getLogger('dberr');

export default class userService {

    constructor() {

    }

    toString(o) {
        return JSON.stringify(o);
    }

    toJson(o) {
        return JSON.parse(o);
    }

    toStringAJson(o) {
        return this.toJson(this.toString(o));
    }

    istype(o) {
        return ({}).toString(o);
    }

    /**
     * 登录(暂限定邮箱登录)
     * @param {*} user 
     * @param {*} callback 
     */
    loginByEmail(user, callback) {
        User.findOne({
            where: { user_email: user.email },
            attributes: [
                ['user_id', 'uid'],
                ['user_name', 'name'],
                ['user_pass', 'pass'],
                ['user_email', 'email'],
                ['user_avatar', 'avatar'],
                ['user_device', 'device'],
                ['user_state', 'state']
            ]
        }).then(result => {
            if (!result) {
                db_log.info("用户邮箱不存在 email:" + user.email);
                return callback({ data: null, code: 201, message: "用户邮箱不存在" });
            }
            let _string = this.toString(result)
            let _result = this.toJson(_string);
            if (_result.pass != user.pass) {
                db_log.info("用户密码输入不正确 pass:" + user.pass);
                return callback({ data: null, code: 201, message: "用户密码输入不正确" });
            }
            db_log.info("loginByEmail Success:" + _string);
            callback({ data: _result, code: 200, message: "查找成功" });
        }).catch(e => {
            db_log.error(JSON.stringify(e));
            callback(null);
        });
    }

    /**
     * 查询并创建用户
     * @param {*} user 
     * @param {*} callback 
     */
    findOrCreate(user, callback) {
        let uuid = SymbolUuid();
        let saveJson = {};
        saveJson['user_id'] = uuid;
        for (let key in user) {
            saveJson['user_' + key] = user[key];
        }
        User.findOrCreate({
            where: { user_email: user.email },
            attributes: ['user_email'],
            defaults: saveJson
        }).spread((collect, created) => {
            db_log.info("User.findOrCreate_created=" + created);
            if (!created) { // 用户邮箱存在则创建失败
                return callback({ data: null, code: 201, message: "用户邮箱已经存在" });
            }
            db_log.info("User.findOrCreate_created_success=" + JSON.stringify(collect));
            let json = this.toStringAJson(collect);
            return callback({ data: json, code: 200, message: "创建成功" });
        }).catch(err => {
            let catch_err = this.toStringAJson(err);
            db_log.error("User.findOrCreate_catch=" + JSON.stringify(err));
            db_log.error("User.findOrCreate_catch_sqlMessage=[" + (catch_err['parent']['sqlMessage']).toString() + "]");
            return callback({ data: null, code: 201, message: "保存数据失败,请稍后重试" });
        });

    }

}