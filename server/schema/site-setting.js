const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  facebook: { type: String, default: '' },
  twitter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  telegram: { type: String, default: '' },
  youtube: { type: String, default: '' },
  apy: {type: Number, default: 0},
});

module.exports = mongoose.model('siteurl', SchemaFormat, 'siteurl');
 