import jwt from "jsonwebtoken"

import config from "../../config/config"
import DB from "../../commonQuery/commonQuery"
const Web3 = require("web3");
var web3 = new Web3(config.netWorkUrl);




export const saveUsers = async (req, res) => {

    try {

        var address = req.body.address;
        console.log(address)
        var data = {
            address: Web3.utils.toChecksumAddress(address)
        }
        var exits = await DB.AsyncfindOne('swapusers', data, {});
        if (!exits) {
            exits = await DB.AsyncInsert('swapusers', data);
        }
        console.log(exits._id, "id")
        const payload = {
            _id: exits._id
        };

        var name = config.jwtname;
        var authToken = req.headers.authentication;
        var token = (authToken) ? authToken.replace(name, "") : "";

        var getJwt = req.headers.authtoken;
        if (getJwt && getJwt != "" && typeof getJwt != "undefined" && getJwt != undefined && getJwt != "undefined"
            && typeof getJwt != "null" && getJwt != null && getJwt != "null") {

            var decoded = await jwt.verify(token, config.Auth_key);

            if ((decoded.address != address) || !decoded) {
                var token = await jwt.sign(
                    payload,
                    config.Auth_key,
                    {
                        expiresIn: '100d'
                    });
                getJwt = config.jwtname + token;
            }

        } else {
            var token = await jwt.sign(
                payload,
                config.Auth_key,
                {
                    expiresIn: '100d'
                });
            getJwt = config.jwtname + token;
        }
        return res.status(200).json({ status: true, 'result': getJwt, 'message': 'added successfully' })

    } catch (err) {
        return res.status(400).json({ status: true, 'result': getJwt, 'message': 'failed' })
    }

};

export const checkUsers = async (req, res) => {
    try {

        var address = req.body.address;
        var data = {
            address: address
        }
        var checkStatus = await DB.AsyncfindOne('swapusers', data, {});
        if (checkStatus && checkStatus.status == 'deactive') {
            return res.status(200).json({ status: true })
        }
        else {
            return res.status(200).json({ status: false })
        }

    }

    catch (err) {
        return res.status(400).json({ status: false })

    }
}
export const saveSubscriber = async (req, res) => {

    try {

        var email = req.body.email;

        var data = {
            email: email
        }
        var exits = await DB.AsyncfindOne('subscribe', data, {});
        if (!exits) {
            exits = await DB.AsyncInsert('subscribe', data);
        }
        return res.status(200).json({ status: true, 'message': 'Subscribed successfully' })

    } catch (err) {
        return res.status(400).json({ status: true, 'message': 'failed' })
    }

};
export const getsettings = (async (req, res) => {

    try {

        var settings = await DB.AsyncfindOne('siteurl', {}, {});


        res.send({
            'status': 200,
            'result': settings
        });

    } catch (err) {
        res.send({ status: 400 });
    }
});

export const getFaq = (async (req, res) => {

    try {

        const faqList = await DB.AsyncFind('faq', {}, {}, {});;
        return res.status(200).send({ success: true, result: faqList, status: 'success' })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: false, message: 'error on server', status: 400 });
    }
});