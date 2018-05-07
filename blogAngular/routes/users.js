import express from 'express';
import { createHash } from 'crypto';
import { OnethinkUsers } from '../core/model/OnethinkUsers';
import { getLogger } from "../lib/log-config";
import Code from '../lib/code';

const loggerInfo = getLogger('info');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json('respond with a resource');
});

/**
 * 用户组注册信息
 */
router.all('/register', function (req, resp, next) {
  let username = req.body.name;
  let userpass = req.body.password;
  let email = req.body.email;

  username = 'machine';
  userpass = '123456';

  let emails = Math.floor((new Date()).getTime() / 1000);
  email = emails + '@qq.com';

  if (!username || !userpass || !email) {
    return resp.json({ message: Code['000'], data: null, status: '000' });
  }

  let md5Pass = createHash('md5');
  userpass = md5Pass.update(userpass).digest('hex');

  const usersModels = new OnethinkUsers({ userTable: { username, userpass, email } });
  loggerInfo.info('user register=' + JSON.stringify({ username, userpass, email }));
  return usersModels.getByEmail(email, function (result) {
    if (result) {
      return resp.json({ message: Code['202'], data: null, status: 202 });
    } else {
      return usersModels.save(function (result) {
        if (!result) {
          return resp.json({ message: Code['205'], data: null, status: 205 });
        }
        return resp.json({ message: Code['200'], data: result.affectedRows, status: 200 });
      });
    }
  });

});

router.all('/update', function (req, resp, next) {
  let username = 'machine1';
  let userpass = '123456';
  let email = '1724554570@qq.com';
  const usersModels = new OnethinkUsers({ setUserUpdate: { username, userpass, email } });
  loggerInfo.info('user update=' + JSON.stringify({ setUserUpdate: { username, userpass, email } }));
  return usersModels.update(function (result) {
    return resp.json({ message: Code['200'], data: null, status: 200 });
  });

});

module.exports = router;
