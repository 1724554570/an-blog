import express from 'express';
import { createHash } from 'crypto';
import { OnethinkUsers } from '../core/models/users';
import { getLogger } from "../lib/log-config";
import Code from '../core/models/code';

const loggerOth = getLogger('oth');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
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
  email = '1724554570@qq.com';

  if (!username || !userpass || !email) {
    return resp.send({ message: Code['000'], data: null, status: '000' });
  }

  let md5Pass = createHash('md5');
  userpass = md5Pass.update(userpass).digest('hex');

  const usersModels = new OnethinkUsers({ username, userpass, email, setUserUpdate: { username, userpass, email } });
  loggerOth.info('/register=' + JSON.stringify({ username, userpass, email }));
  return resp.send({ message: Code['202'], data: null, status: 202 });
  return usersModels.getByEmail(email, function (result) {
    if (result) {
      return resp.send({ message: Code['202'], data: null, status: 202 });
    } else {
      // usersModels.save(function (result) {

      // });
      return resp.send({ message: Code['200'], data: null, status: 200 });
    }
  });

});

router.all('/update', function (req, resp, next) {
  let username = 'machine';
  let userpass = '123456';
  let email = '1724554570@qq.com';
  const usersModels = new OnethinkUsers({ setUserUpdate: { username, userpass, email } });
  loggerOth.info('/usersModels-update=' + JSON.stringify({ setUserUpdate: { username, userpass, email } }));
  usersModels.update(function (result) {
    loggerOth.info('/update-result=' + JSON.stringify(result));
    return resp.send({ message: Code['200'], data: null, status: 200 });
  });

});

module.exports = router;
