var { isString, isNumber, isObject, isAddress } = require('./validate');


async function addliqutityValidate(reqBody) {

    var errors = {};

    var address = await isAddress(reqBody.address);
    var fromaddress = await isAddress(reqBody.fromaddress);
    var fromamount = await isNumber(reqBody.fromamount);
    var toaddress = await isAddress(reqBody.toaddress);
    var toamount = await isNumber(reqBody.toamount);
    var txid = await isString(reqBody.txid);
    var gasfee = await isNumber(reqBody.gasfee);
    var lpamount = await isNumber(reqBody.lpamount);

    if (!address) {
        errors.address = "Invalid address";
    }
    if (!fromaddress) {
        errors.fromaddress = "Invalid from address";
    }
    if (!fromamount) {
        errors.fromamount = "Invalid from amount";
    }
    if (!toaddress) {
        errors.toaddress = "Invalid to address";
    }
    if (!toamount) {
        errors.toamount = "Invalid to amount";
    }
    if (!txid) {
        errors.txid = "Invalid transaction hash";
    }
    if (!gasfee) {
        errors.gasfee = "Invalid gas fee";
    }

    return errors;
}

async function removeliqutityValidate(reqBody) {

    var errors = {};

    var address = await isAddress(reqBody.address);
    var fromaddress = await isAddress(reqBody.fromaddress);
    var fromamount = await isNumber(reqBody.fromamount);
    var toaddress = await isAddress(reqBody.toaddress);
    var toamount = await isNumber(reqBody.toamount);
    var txid = await isString(reqBody.txid);
    var gasfee = await isNumber(reqBody.gasfee);

    if (!address) {
        errors.address = "Invalid address";
    }
    if (!fromaddress) {
        errors.fromaddress = "Invalid from address";
    }
    if (!fromamount) {
        errors.fromamount = "Invalid from amount";
    }
    if (!toaddress) {
        errors.toaddress = "Invalid to address";
    }
    if (!toamount) {
        errors.toamount = "Invalid to amount";
    }
    if (!txid) {
        errors.txid = "Invalid transaction hash";
    }
    if (!gasfee) {
        errors.gasfee = "Invalid gas fee";
    }

    return errors;
}


module.exports = {
    addliqutityValidate,
    removeliqutityValidate
}