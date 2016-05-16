'use strict';

import mongoose from 'mongoose';

var LeagueSchema = new mongoose.Schema({
    name: String,
    /* 1 private 0 public*/
    status: Number,
    /*1 gratuit/ 2 avec mise*/
    type: Number,
    description: String,

    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    /*members: mongoose.Schema.Types.Mixed,*/

    members: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

    }],

    active: Boolean
});

export default mongoose.model('League', LeagueSchema);
