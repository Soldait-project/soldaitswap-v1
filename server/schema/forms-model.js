const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SchemaFormat = new Schema({
    pid: {
        type: Number,
        default: 0
    },
    risk: {
        type: Number,
        default: 0
    },
    lpSymbol: {
        type: String,
        default: ""
    },
    alloc: {
        type: String,
        default: ""
    },
    isTokenOnly: {
        type: Boolean,
        default: "false"
    },
    lpAddresses: {
        type: String,
        default: " "
    },
    tokenSymbol: {
        type: String,
        default: ""
    },
    tokenAddresses: {
        type: String,
        default: ""
    },
    quoteTokenSymbol: {
        type: String,
        default: ""
    },
    quoteTokenAdresses: {
        type: String,
        default: ""
    },
    depositFee:
    {
        type: String,
        default: ""
    },
    apy:
    {
        type: Number,
        default: ""
    },
    withdrawFee: {
        type: String,
        default: ""
    },
    tokenAImage: {
        type: String,
        default: ""
    },
    tokenBImage: {
        type: String,
        default: ""
    },
    logoURI: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "Live",
    },
}, { timestamps: true });

module.exports = mongoose.model('forms', SchemaFormat, 'forms');