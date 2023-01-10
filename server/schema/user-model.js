const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  address: { type: String, default: '' },
  refaddress: { type: String, default: '' },
  referalcommisions: { type: Number, default: 0 },
  level1users: { type: Number, default: 0 },
  level2users: { type: Number, default: 0 },
  level3users: { type: Number, default: 0 },
  level4users: { type: Number, default: 0 },
  level5users: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
});

module.exports = mongoose.model('swapusers', SchemaFormat, 'swapusers');

 