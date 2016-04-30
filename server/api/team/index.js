'use strict';

var express = require('express');
var controller = require('./team.controller');

var router = express.Router();

// Exemple : http://localhost:9000/api/teams, appelera la fonction index du controller si tu fais un http.get
router.get('/', controller.index);
router.get('/:id', controller.show);
// Exemple : http://localhost:9000/api/teams, appelera la fonction index du controller si tu fais un http.post
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;