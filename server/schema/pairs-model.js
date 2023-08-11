const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
    pair_address: { type: String, default: '' },
    base_name: { type: String, default: '' },
    base_symbol: { type: String, default: '' },
    base_totalsupply: { type: Number, default: 0 },
    base_deadvalue: { type: Number, default: 0 },
    base_address: { type: String, default: '' },
    base_decimals: { type: Number, default: 0 },
    quote_name: { type: String, default: '' },
    quote_symbol: { type: String, default: '' },
    quote_totalsupply: { type: Number, default: 0 },
    quote_deadvalue: { type: Number, default: 0 },
    quote_address: { type: String, default: '' },
    quote_decimals: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    base_volume: { type: Number, default: 0 },
    quote_volume: { type: Number, default: 0 },
    liquidity: { type: Number, default: 0 },
    liquidity_BNB: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('pairs', SchemaFormat, 'pairs');