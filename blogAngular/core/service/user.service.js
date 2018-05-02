import Sequelize from "sequelize";
import User from '../sequelize/User.model';
import { getLogger } from "../../lib/log-config";

const db_log = getLogger('dberr');

export default class userService {

    constructor() {

    }

    loginByEmail(user, cb) {
        User.findOne({
            where: { user_email: user.email, user_pass: user.pass },
            attributes: [
                ['user_id', 'uid'],
                ['user_name', 'name'],
                ['user_email', 'email'],
                ['user_avatar', 'avatar'],
                ['user_device', 'device'],
                ['user_state', 'state']
            ]
        }).then(result => {
            db_log.info(JSON.stringify(result));
            cb(result);
        }).catch(e => {
            db_log.error(JSON.stringify(e));
            cb(null);
        });
    }

}