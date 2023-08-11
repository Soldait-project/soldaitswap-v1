const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
    name: { type: String, default: '' },
    symbol: { type: String, default: 0 },
    address: { type: String, default: '' },
    chainId: { type: Number, default: 0 },
    decimals: { type: Number, default: 0 },
    totalSupply: { type: String, default: '' },
    logoURI: { type: String, default: '' },
    default: { type: String, default: 'no' },
    siteToken: { type: String, default: 'no' },
    addedbyuser: { type: String, default: "no" },
    useraddress: { type: String, default: "" },
    price: { type: Number, default: 0 },
    price_BNB: { type: Number, default: 0 },
    status: { type: String, default: "Live" },
    tradetype: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('tokens', SchemaFormat, 'tokens');