import axios from "axios/dist/axios";
import config from "../config/config";
const jwt = require('jsonwebtoken');

const baseUrl = config.baseUrl;

export const getSiteAuth = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/get-site-auth`,
            'headers': { 'nvgftyu': localStorage.getItem('khdbfty') }
        });
        return {
            loading: false,
            result: respData.data.result,
            adminaddress: respData.data.adminaddress
        }
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}

export const getToken = async (data) => {
    try {
        let payload = {
            address: data.address,
            time: Date.now()
        }
        var token = await jwt.sign(
            payload,
            config.secretKey,
            {
                expiresIn: 60 * 3
            });
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/generateToken`,
            'headers': { 'hash': token }
        });
        return respData.data.getJwt
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}



function returnErr(err) {
    if (err.response && err.response.data && err.response.data.errors) {
        return err.response.data.errors;
    }
    else {
        return '';
    }
}


