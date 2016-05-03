/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/traductions              ->  index
 * POST    /api/traductions              ->  create
 * GET     /api/traductions/:id          ->  show
 * PUT     /api/traductions/:id          ->  update
 * DELETE  /api/traductions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Traduction from './traduction.model';

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

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
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

function loaderTrad(res, lang) {
    return function(entity) {
        if (entity) {
            //créer l'objet réponse
            var ob = {};
            var resloader = _.map(entity, function(trad) {
                // pour chaque phase anglais, mettre la traduction de la langue en face
                ob[trad.en] = trad[lang.lang];
                return ob;
            });
            return resloader[0];
        }
    };
}

// Gets a list of Traductions
export function index(req, res) {
    return Traduction.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}



// Gets a list of Traductions
export function loader(req, res) {
    return Traduction.find().exec()
        // créer la réponse tel qu'attendu par translater
        .then(loaderTrad(res, req.query))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Traduction from the DB
export function show(req, res) {
    return Traduction.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Traduction in the DB
export function create(req, res) {
    return Traduction.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Traduction in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Traduction.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Traduction from the DB
export function destroy(req, res) {
    return Traduction.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
