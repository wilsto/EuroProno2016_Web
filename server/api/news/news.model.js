'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsSchema = new Schema({
    date: Date,
    title: String,
    type: Number,
    info: String,
    image: String,
    active: Boolean
});

module.exports = mongoose.model('News', NewsSchema);
