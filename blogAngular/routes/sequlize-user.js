import express from 'express';
import { createHash } from 'crypto';
import { getLogger } from "../lib/log-config";
import Code from '../lib/code';
import userService from '../core/service/user.service';

const router = express.Router();
const loggerInfo = getLogger('info');
const _userService = new userService();

//import DbInitialization from '../core//sequelize//Model.init';

router.all('/user/create', function (req, resp, next) {
    let username = req.body.name;
    let userpass = req.body.password;
    let email = req.body.email;
    username = 'machine';
    userpass = '123456';
    let emails = Math.floor((new Date()).getTime() / 1000);
    // emails = '17245545702';
    email = emails + '@qq.com';
    if (!username || !userpass || !email) {
        return resp.json({ message: Code['000'], data: null, code: '000' });
    }
    let md5Pass = createHash('md5');
    userpass = md5Pass.update(userpass).digest('hex');

    return _userService.findOrCreate({ name: username, pass: userpass, email: email }, res => {
        if (res) {
            return resp.json(res);
        }
        return resp.json({ message: 'aa', code: 200, data: null });
    });

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
        return resp.json({ message: Code['000'], data: null, code: '000' });
    }
    let md5Pass = createHash('md5');
    userpass = md5Pass.update(userpass).digest('hex');

    return _userService.loginByEmail({ email: email, pass: userpass }, res => {
        if (res) {
            return resp.json(res);
        }
        return resp.json({ message: 'aa', code: 200, data: null });
    });

});

module.exports = router;