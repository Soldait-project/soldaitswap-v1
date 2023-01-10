const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  username: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  password: { type: String, default: '' },
  mailcode: { type: String, default: ''},
  antiphishingcode: { type: String, default: ''},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('admin', SchemaFormat, 'admin');

