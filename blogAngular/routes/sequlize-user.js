import express from 'express';
const router = express.Router();

import UserImpl from '../core/implement/user-impl';

router.all('/user/create', UserImpl.register);

router.all('/user/login', UserImpl.sign_up);

router.all('/user/logout', UserImpl.sign_out);

router.all('/user/getinfo',UserImpl.getInfo);

module.exports = router;