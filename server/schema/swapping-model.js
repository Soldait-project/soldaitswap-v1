const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  fromaddress: { type: String, default: '' },
  fromamount: { type: Number, default: 0 },
  toaddress: { type: String, default: '' },
  toamount: { type: Number, default: 0 },
  gasfee: { type: Number, default: 0 },
  useraddress: { type: String, default: "" },
  txid: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('swapping', SchemaFormat, 'swapping');