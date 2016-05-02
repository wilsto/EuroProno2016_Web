'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MatchSchema = new Schema({
    typematch: String,
    group: String,
    grouporder: Number,
    team1: String,
    team2: String,
    date: Date,
    stade: String,
    image: String,
    active: Boolean
});

module.exports = mongoose.model('Match', MatchSchema);
