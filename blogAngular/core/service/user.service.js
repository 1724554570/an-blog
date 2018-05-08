import Sequelize from "sequelize";
import User from '../model/user-model';
import { getLogger } from "../../lib/log-config";
import { SymbolUuid, callBack } from '../../lib/util';

const DBERROR = getLogger('dberr');

export default class userService {

    constructor() {

    }

    /**
     * 登录(暂限定邮箱登录)
     * @param {*} user 
     * @param {*} cb 
     */
    loginByEmail(user, cb) {
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
                DBERROR.info("用户邮箱不存在 email:" + user.email);
                return cb({ data: null, code: 201, message: "用户邮箱不存在" });
            }
            let jsonRes = result.get({ plain: true });
            if (jsonRes.pass != user.pass) {
                DBERROR.info("用户密码输入不正确 pass:" + user.pass);
                return cb({ data: null, code: 201, message: "用户密码输入不正确" });
            }
            DBERROR.info("loginByEmail Success:" + JSON.stringify(result));
            return cb({ data: jsonRes, code: 200, message: "查找成功" });
        }).catch(e => {
            DBERROR.error(JSON.stringify(e));
            return cb(callBack());
        });
    }

    /**
     * 查询并创建用户
     * @param {*} user 
     * @param {*} cb 
     */
    findOrCreate(user, cb) {
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
            DBERROR.info("User.findOrCreate_created=" + JSON.stringify(collect));
            if (!created) { // 用户邮箱存在则创建失败
                return cb({ data: null, code: 201, message: "用户邮箱已经存在" });
            }
            let jsonRes = collect.get({ plain: true });
            return cb({ data: jsonRes, code: 200, message: "创建成功" });
        }).catch(e => {
            DBERROR.error("User.findOrCreate_catch=" + JSON.stringify(e));
            return cb(callBack());
        });

    }

    findAndCountAll(uid, cb) {
        User.findAndCountAll({
            include: [
                { model: Article, required: true }
            ],
        }).then(res => {
            DBERROR.info("User.findAndCountAll=" + res);
            return cb(res);
        }).catch(e => {
            DBERROR.error(JSON.stringify(e));
            return cb(callBack());
        });
    }

}