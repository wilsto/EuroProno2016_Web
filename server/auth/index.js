'use strict';

import express from 'express';
import passport from 'passport';
var forgot = require('./local/forgot');
var reset = require('./local/reset');
import config from '../config/environment';
import User from '../api/user/user.model';
import jwt from 'jsonwebtoken';
// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);
require('./google/passport').setup(User, config);
require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').default);
router.use('/facebook', require('./facebook').default);
router.use('/twitter', require('./twitter').default);
router.use('/google', require('./google').default);

router.get('/forgot', forgot.forgotPassword);
router.get('/reset', reset.resetPassword);

export default router;
