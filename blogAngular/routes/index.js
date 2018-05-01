var express = require('express');
var router = express.Router();

const list = {
  users: [
    { text: '更新', url: '/apis/update' },
    { text: '注册', url: '/apis/register' }
  ]
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', routerlist: list });
});

module.exports = router;
