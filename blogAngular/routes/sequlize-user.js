import express from 'express';
import { createHash } from 'crypto';
import { getLogger } from "../lib/log-config";
import Code from '../core/models/code';

let loggerInfo = getLogger('info');
let router = express.Router();

// import { User } from '../core/sequelize/User.model';
// import { Article } from '../core/sequelize/Article.model';
// import { Comment } from '../core/sequelize/Comment.model';

import { User, Article, Coment } from "../core/sequelize/db.model.init";

router.all('/user/create', function (req, resp, next) {

});

module.exports = router;