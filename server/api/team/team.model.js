'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// ici c'est le schéma de ta base de  données no-sql
var TeamSchema = new Schema({
  code: String, 
  name: String,
  group: String,
  image: String
});
// ton schéma est crée
module.exports = mongoose.model('Team', TeamSchema);