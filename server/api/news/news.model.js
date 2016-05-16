'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: String,
    type: Number,
    info: String,
    image: String,
    active: {
        type: Boolean,
        default: true
    },
    url: String
});

module.exports = mongoose.model('News', NewsSchema);
