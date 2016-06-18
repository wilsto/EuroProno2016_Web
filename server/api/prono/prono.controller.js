/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pronos              ->  index
 * POST    /api/pronos              ->  create
 * GET     /api/pronos/:id          ->  show
 * PUT     /api/pronos/:id          ->  update
 * DELETE  /api/pronos/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Prono from './prono.model';
import User from '../user/user.model';
var ObjectId = require('mongoose').Types.ObjectId;

var interval = setInterval(calculateScore, 60000);
calculateScore();

function calculateScore() {
    console.log('calculation in progress');
    Prono.findOne({ 'user_id': new ObjectId('57528b03ec21fa0300c23c86') }).exec((errpronosEuro, pronosEuro) => {
        //console.log('errpronosEuro', errpronosEuro);
        console.log('pronosEuro', pronosEuro.matchs.length);

        Prono.find({}).populate('user_id').lean().exec((err, pronos) => {
            _.each(pronos, (thisProno) => {
                var pronodate = new Date(thisProno.date);
                var mypronodate = pronodate.getTime();

                _.each(pronosEuro.matchs, (euroMatch, index) => {
                    var pronoMatch = null;
                    if (euroMatch.result !== null && euroMatch.result !== undefined) {
                        pronoMatch = _.filter(thisProno.matchs, { '_id': euroMatch._id });
                        pronoMatch = pronoMatch[0];
                        pronoMatch.bet = { points: 0, pointsWinner: 0, pointsScore1: 0, pointsScore2: 0, invalid: 0 };
                        var matchdate = new Date(pronoMatch.date);
                        var euroMatchdate = matchdate.getTime();
                        if (mypronodate < euroMatchdate) {
                            if (euroMatch.team1points === pronoMatch.team1points) {
                                pronoMatch.bet.points += 3;
                                pronoMatch.bet.pointsWinner += 3;
                                //console.log('euroMatch', euroMatch.team1 + ' ' + euroMatch.score1 + ' - ' + euroMatch.team2 + ' ' + euroMatch.score2);
                                //console.log('pronoMatch', pronoMatch.team1 + ' ' + pronoMatch.score1 + ' - ' + pronoMatch.team2 + ' ' + pronoMatch.score2);
                            }
                            if (euroMatch.score1 === pronoMatch.score1) {
                                pronoMatch.bet.points += 1;
                                pronoMatch.bet.pointsScore1 += 1;
                            }
                            if (euroMatch.score2 === pronoMatch.score2) {
                                pronoMatch.bet.points += 1;
                                pronoMatch.bet.pointsScore2 += 1;
                            }
                        } else {
                            pronoMatch.bet = { points: 0, pointsWinner: 0, pointsScore1: 0, pointsScore2: 0, invalid: 1 };
                        }
                    } else {
                        pronoMatch = _.filter(thisProno.matchs, { '_id': euroMatch._id });
                        pronoMatch = pronoMatch[0];
                        pronoMatch.bet = { points: 0, pointsWinner: 0, pointsScore1: 0, pointsScore2: 0, invalid: 0 };
                    }
                    if (index === pronosEuro.matchs.length - 1) {
                        thisProno.bet = { points: 0 };
                        var allPoints = _.compact(_.map(thisProno.matchs, 'bet.points'));
                        allPoints = _.reduce(allPoints, function(s, entry) {
                            return s + parseFloat(entry);
                        }, 0);
                        thisProno.bet.points = allPoints;
                        // mis à jour des pronos
                        Prono.findOneAndUpdate({ "_id": thisProno._id }, {
                                "$set": {
                                    "matchs": thisProno.matchs,
                                    "bet": thisProno.bet
                                }
                            },
                            function(err, doc) {
                                if (err) {
                                    console.log('err', err);
                                }
                            }
                        );
                    }
                });
            });
        });
    });

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
        updated.markModified('matchs');
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
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
        res.status(statusCode).send(err);
    };
}

// Gets a list of Pronos
export function index(req, res) {
    return Prono.find({}).populate('user_id').exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a count of Pronos
export function count(req, res) {
    return Prono.count({}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Prono from the DB
export function show(req, res) {
    return Prono.findById(req.params.id).populate('user_id').exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Prono from the DB
export function showUser(req, res) {
    return Prono.find({ user_id: req.params.id }).populate('user_id').exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Prono in the DB
export function create(req, res) {

    return Prono.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Prono in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Prono.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Prono from the DB
export function destroy(req, res) {
    return Prono.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
