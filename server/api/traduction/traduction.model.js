'use strict';

import mongoose from 'mongoose';

var TraductionSchema = new mongoose.Schema({
    page: String,
    en: {},
    fr: {},
    de: {},
    es: {},
    active: { type: Boolean, default: true }
});

export default mongoose.model('Traduction', TraductionSchema);
