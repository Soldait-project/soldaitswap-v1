const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
    email: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('subscribe', SchemaFormat, 'subscribe');

