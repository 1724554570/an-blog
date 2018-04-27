var express = require('express');
var router = express.Router();

// var crypto = require('crypto');
import { createHash } from 'crypto';
import Code from '../core/models/code';

// 导入mongoose模块
// var mongoose = require('mongoose');

import { OnethinkUsers } from '../core/models/users';


import { getLogger } from "../lib/log-config";
const loggerOth = getLogger('oth');

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
  email = '17245545701@qq.com';

  if (!username || !userpass || !email) {
    return resp.send({ message: Code['000'], data: null, status: '000' });
  }

  let md5Pass = createHash('md5');
  userpass = md5Pass.update(userpass).digest('hex');

  loggerOth.info(JSON.stringify({ username, userpass, email }));

  const usersModels = new OnethinkUsers({ username, userpass, email });
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


module.exports = router;
