var express = require('express');
var router = express.Router();

var crypto = require('crypto'),
  // Users = require('../core/models/users'),
  Code = require('../core/models/code');
;

var mongoose = require('mongoose');//导入mongoose模块
let UsersModels = require('../core/models/users');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router.all('/register', function (req, resp, next) {
  let name = req.body.name;
  let password = req.body.password;
  let email = req.body.email;

  // console.log(req.body);
  if (!name || !password || !email) {
    return resp.send({ message: Code['000'], data: null, status: '000' });
  }

  let md5Pass = crypto.createHash('md5');
  password = md5Pass.update(password).digest('hex');

  // let createUser = new Users({ name, password, email });

  // createUser.get(name, function (err, queryResp) {
  //   if (err) {
  //     return resp.send({ message: Code['203'], data: null, status: 203 });
  //   }
  //   if (queryResp) {
  //     return resp.send({ message: Code['202'], data: null, status: 202 });
  //   }
  //   createUser.save(function (e, saveQuery) {
  //     if (err) {
  //       return resp.send({ message: Code['203'], data: null, status: 203 });
  //     }
  //     return resp.send({
  //       message: Code['200'],
  //       data: { user: saveQuery },
  //       status: 200
  //     });
  //   })
  // });

  UsersModels.getExist(name, function (err, result) {
    if (err) throw err;
    console.log(result);

  })


  return resp.send({
    message: Code['200'],
    data: { user: 1 },
    status: 200
  });

});


module.exports = router;
