const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  identifier: { type: String, default: '' },
  subject: { type: String, default: '' },
  content: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('template', SchemaFormat, 'template');
