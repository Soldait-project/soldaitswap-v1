const Web3 = require("web3");
var config = require('../config/config');

function isString(StringVal) {
    var status = false;
    if (StringVal && StringVal != "" && typeof StringVal === 'string') {
        status = true
    }
    return status;
}

function isNumber(NumberVal) {
    var status = false;
    if (NumberVal && NumberVal != "" && typeof parseFloat(NumberVal) === 'number') {
        status = true
    }
    return status;
}

function isObject(ObjectVal) {
    var status = false;
    if (ObjectVal && ObjectVal != "" && typeof ObjectVal === 'object') {
        status = true
    }
    return status;
}

function isAddress(AddressVal) {

    var web3 = new Web3(config.netWorkUrl);
    var status = web3.utils.isAddress(AddressVal)

    return status;
}



module.exports = {
    isString,
    isNumber,
    isObject,
    isAddress
}