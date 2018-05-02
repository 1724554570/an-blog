import Sequelize from "sequelize";
import User from '../sequelize/User.model';
import { getLogger } from "../../lib/log-config";

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
                return cb({ data: null, code: 201, message: "用户邮箱不存在" });
            }
            let _string = this.toString(result)
            let _result = this.toJson(_string);
            if (_result.pass != user.pass) {
                db_log.info("用户密码输入不正确 pass:" + user.pass);
                return cb({ data: null, code: 201, message: "用户密码输入不正确" });
            }
            db_log.info("loginByEmail Success:" + _string);
            callback({ data: _result, code: 200, message: "查找成功" });
        }).catch(e => {
            db_log.error(JSON.stringify(e));
            callback(null);
        });
    }

}