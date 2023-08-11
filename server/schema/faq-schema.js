const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
  question: { type: String, default: '' },
  answer: { type: String, default: '' },
  
});

module.exports = mongoose.model('faq', SchemaFormat, 'faq');
 