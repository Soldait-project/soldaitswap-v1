var { isAddress } = require('./validate');

async function adduserValidate(reqBody) {

    var errors = {};

    var address = await isAddress(reqBody.address);

    if (!address) {
        errors.address = "Invalid address";
    }
    return errors;
}

async function addreferalValidate(reqBody) {

    var errors = {};

    var address = await isAddress(reqBody.address);
    var refaddress = await isAddress(reqBody.refaddress);

    if (!address) {
        errors.address = "Invalid address";
    }
    if (!refaddress) {
        errors.refaddress = "Invalid referal address";
    }
    return errors;
}

module.exports = {
    adduserValidate,
    addreferalValidate
}