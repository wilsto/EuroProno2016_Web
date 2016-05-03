'use strict';

import mongoose from 'mongoose';

var PronoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    valid: { type: Boolean, default: false },
    matchs: []
        /*,
        pronostics: [{
            match_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
            score: {},
            points: {}
        }]
        */
});

export default mongoose.model('Prono', PronoSchema);
