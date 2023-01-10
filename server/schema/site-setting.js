const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  facebook: { type: String, default: '' },
  twitter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  telegram: { type: String, default: '' },
});

module.exports = mongoose.model('siteurl', SchemaFormat, 'siteurl');
 