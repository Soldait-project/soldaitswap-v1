var { isString, isNumber, isObject, isAddress } = require('./validate');


async function addswapValidate(reqBody) {

    var errors = {};

    var address = await isAddress(reqBody.address);
    var fromaddress = await isAddress(reqBody.fromaddress);
    var fromamount = await isNumber(reqBody.fromamount);
    var toaddress = await isAddress(reqBody.toaddress);
    var toamount = await isNumber(reqBody.toamount);
    var txid = await isString(reqBody.txid);
    var gasfee = await isNumber(reqBody.gasfee);
    var swapService = await isNumber(reqBody.swapService);
    var fromSymbol = await isString(reqBody.fromSymbol);
    var toSymbol = await isString(reqBody.toSymbol);

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

    if (!fromSymbol) {
        errors.fromSymbol = "Invalid service fee";
    }
    if (!toSymbol) {
        errors.toSymbol = "Invalid to symbol";
    }
    return errors;
}

async function swapfeeValidate(reqBody) {

    var errors = {};

    var from = await isAddress(reqBody.from);
    var to = await isAddress(reqBody.to);
    var token = await isAddress(reqBody.token);
    var tokensymbol = await isString(reqBody.tokensymbol);
    var amount = await isNumber(reqBody.amount);
    var txid = await isString(reqBody.txId);

    if (!from) {
        errors.address = "Invalid from address";
    }
    if (!to) {
        errors.fromaddress = "Invalid to address";
    }
    if (!token) {
        errors.token = "Invalid token amount";
    }
    if (!tokensymbol) {
        errors.tokensymbol = "Invalid token symbol";
    }
    if (!amount) {
        errors.amount = "Invalid Amount";
    }
    if (!txid) {
        errors.txid = "Invalid transaction hash";
    }

    return errors;
}


module.exports = {
    addswapValidate,
    swapfeeValidate
}