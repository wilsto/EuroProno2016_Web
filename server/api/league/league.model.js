'use strict';

import mongoose from 'mongoose';

var MemberSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    validated: {
        type: Boolean,
        default: false
    },
    join_date: {
        type: Date,
        default: Date.now
    },
    validationDate: {
        type: Date,
    }
});

var LeagueSchema = new mongoose.Schema({
    name: String,
    /* 1 private 0 public*/
    status: Number,
    /*1 gratuit/ 2 avec mise*/
    type: Number,
    description: String,
    pinned: {
        type: Boolean,
        default: false
    },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [MemberSchema],
    active: Boolean
}, {
    strict: false
});

export default mongoose.model('League', LeagueSchema);
