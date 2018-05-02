import express from 'express';
import { createHash } from 'crypto';
import { getLogger } from "../lib/log-config";
import Code from '../core/models/code';
import userService from '../core/service/user.service';

const router = express.Router();
const loggerInfo = getLogger('info');
const _userService = new userService();

//import DbInitialization from '../core//sequelize//Model.init';

router.all('/user/create', function (req, resp, next) {

});

router.all('/user/login', function (req, resp, next) {
    let username = req.body.name;
    let userpass = req.body.password;
    let email = req.body.email;
    username = 'machine';
    userpass = '123456';
    let emails = Math.floor((new Date()).getTime() / 1000);
    emails = '1724554570';
    email = emails + '@qq.com';
    if (!username || !userpass || !email) {
        return resp.json({ message: Code['000'], data: null, status: '000' });
    }
    let md5Pass = createHash('md5');
    userpass = md5Pass.update(userpass).digest('hex');

    _userService.loginByEmail({ email: email, pass: userpass }, res => {
        if (res) {
            console.log(res.user_id);
        }
    });
    resp.json({ message: 'aa', code: 200, data: null });

});

module.exports = router;