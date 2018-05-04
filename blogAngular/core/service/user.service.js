import Sequelize from "sequelize";
import User from '../sequelize/User.model';
import { getLogger } from "../../lib/log-config";
import { SymbolUuid } from '../../lib/util';

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

    createUser(user, callback) {
        User.findOne({
            where: { user_email: user.email },
            attributes: ['user_email']
        }).then(r => {
            db_log.info("User.createUser=" + JSON.stringify(r));
            if (!r) {
                async function f() {
                    let res = await this.save(user);
                    return res;
                }
                return callback(f().then(res => {
                    return res;
                }).catch(e => {
                    db_log.info("User.createUser=" + JSON.stringify(e));
                }));
            }
            return callback({ data: null, code: 201, message: "用户邮箱已经存在" });
        })
    }

    save(user) {
        let uuid = SymbolUuid();
        let saveJson = {};
        saveJson['user_id'] = uuid;
        for (let key in user) {
            saveJson['user_' + key] = user[key];
        }
        db_log.info(JSON.stringify(saveJson));
        return User.create(saveJson)
            .then(result => {
                let json = result.get({ plain: true });
                db_log.info("User.create=" + JSON.stringify(json));
                if (json) {
                    return { data: json, code: 200, message: "创建成功" };
                }
            }).catch(err => {
                db_log.error(JSON.stringify(err));
                return { data: null, code: 201, message: "保存数据失败,请稍后重试" };
            });
    }

}