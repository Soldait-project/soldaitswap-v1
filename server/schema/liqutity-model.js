const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  fromaddress: { type: String, default: '' },
  fromamount: { type: Number, default: 0 },
  toaddress: { type: String, default: '' },
  toamount: { type: Number, default: 0 },
  gasfee: { type: Number, default: 0 },
  useraddress: { type: String, default: 0 },
  txid: { type: String, default: '' },
  router: { type: String, default: '' },
  lpamount: { type: Number, default: 0 },
  actiontype: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: {type: Number,default: 1},
});

module.exports = mongoose.model('liqutity', SchemaFormat, 'liqutity');