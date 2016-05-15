'use strict';

import mongoose from 'mongoose';

var LeagueSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('League', LeagueSchema);
