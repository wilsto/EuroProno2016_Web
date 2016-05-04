'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsSchema = new Schema({
    group: String,
    title: String,
    info: String,
    image: String,
    active: Boolean
});

module.exports = mongoose.model('News', NewsSchema);