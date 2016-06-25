/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users                   for admin     ->  index
 * GET     /api/users/me                connected     ->  me 
 * POST    /api/users                                 ->  create
 * GET     /api/users/:id               connected     ->  show
 * PUT     /api/users/:id               connected     ->  update
 * PUT     /api/users/:id/password      connected     ->  changePassword
 * DELETE  /api/users/:id               for admin     ->  destroy
 */

'use strict';

import _ from 'lodash';
import User from './user.model';

import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import postmark from 'postmark';
var fs = require('fs');
// img path
var imgPath = './client/assets/images/Ced.png';

var client = new postmark.Client("29e166e9-7166-4623-a39e-21c5c9e33ae9");

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        return res.status(statusCode).json(err);
    }
}

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function(entity) {

        var updated = _.merge(entity, updates);
        updated.status = updates.status;
        updated.markModified('status');

        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }

        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        return res.status(statusCode).send(err);
    };
}

export function index(req, res) {
    return User.find({}, '-salt -password').exec()
        .then(users => {
            return res.status(200).json(users);
        })
        .catch(handleError(res));
}


export function count(req, res) {
    return User.count({}).exec()
        .then(users => {
            return res.status(200).json(users);
        })
        .catch(handleError(res));
}


export function list(req, res) {
    return User.find({}, '-salt -password').exec()
        .then(users => {
            return res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save()
        .then(function(user) {
            var token = jwt.sign({ _id: user._id }, config.secrets.session, {
                expiresIn: 60 * 60 * 24 * 7 * 4
            });
            client.sendEmail({
                'From': process.env.MAILFROM,
                'To': process.env.MAILFROM,
                'Subject': 'New User : ' + user.name,
                'TextBody': 'New user named ' + user.name + ' with email as ' + user.email
            });
            res.json({ token });
        })
        .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
    var userId = req.params.id;

    return User.findById(userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            return res.json(user.profile);
        })
        .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
    return User.findByIdAndRemove(req.params.id).exec()
        .then(function() {
            res.status(204).end();
        })
        .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return User.findById(userId).exec()
        .then(user => {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.save()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

/*** Update user 
export function update(req, res) {
    var userId = req.user._id;

    return User.findById(userId).exec()
        .then(user => {
            user.name = String(req.body.name);
            user.email = String(req.body.email);
            user.lang = String(req.body.lang);
            user.status[0].profil = Number(req.body.status[0].profil);
            user.avatar = String(req.body.avatar);
            console.log(user.avatar);
            return user.save()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}
*/
// Updates an existing Prono in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    console.log("res", req.body);
    return User.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

/**
 * Get my info
 */
export function me(req, res, next) {
    var userId = req.user._id;

    return User.findOne({ _id: userId }, '-salt -password').exec()
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            return res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
    res.redirect('/');
}
