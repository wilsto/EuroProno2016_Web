/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/leagues              ->  index
 * POST    /api/leagues              ->  create
 * GET     /api/leagues/:id          ->  show
 * PUT     /api/leagues/:id          ->  update
 * DELETE  /api/leagues/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import League from './league.model';
import User from '../user/user.model';

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
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function saveUpdatesMembers(updates, add) {
    return function(entity) {
        var members = _.filter(entity.members, (member) => {
            if (member.user !== undefined) {
                return member.user.toString() !== updates.user;
            }
        });
        delete entity.members;
        entity.members = members;
        if (add) {
            entity.members.push(updates);
        }
        return entity.save(function(err, res) {
            //console.log(err, res);
        });
    }
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    return res.status(204).end();
                });
        }
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
        console.log('err', err);
        return res.status(statusCode).send(err);
    };
}

function populateUser(res) {
    return function(entity) {
        return entity;
    };
}


// Gets a list of Leagues
export function index(req, res) {
    return League.find().populate('owner_id').exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a count of Leagues
export function count(req, res) {
    return League.count().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Gets a single League from the DB
export function show(req, res) {
    return League.findById(req.params.id).populate('owner_id').populate('members.user').exec()
        .then(handleEntityNotFound(res))
        .then(populateUser(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets league from an owner the DB
export function showUser(req, res) {
    return User.find({ owner_id: req.params.id }).populate('owner_id').exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Creates a new League in the DB
export function create(req, res) {
    return League.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing League in the DB
export function update(req, res) {

    if (req.body._id) {
        delete req.body._id;
    }

    return League.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Updates members of a League in the DB
export function updateMembers(req, res) {

    return League.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdatesMembers(req.body, true))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates members of a League in the DB
export function removeMembers(req, res) {
    return League.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdatesMembers(req.body, false))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a League from the DB
export function destroy(req, res) {
    return League.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
