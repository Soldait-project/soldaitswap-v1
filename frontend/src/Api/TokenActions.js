import axios from "axios/dist/axios";
import config from "../config/config";

const baseUrl = config.baseUrl;
axios.defaults.headers.common['Authentication'] = localStorage.getItem('khdbfty') ? localStorage.getItem('khdbfty') : "";


export const tokenDetails = async (data) => {
    var useraddress = (data && data.useraddress) ? data.useraddress : 0;
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/token-list?address=` + useraddress
        });
        return {
            loading: false,
            result: respData.data.list
        }
    }
    catch (err) {

        return {
            loading: false,
            error: returnErr(err)
        }
    }
}

export const getBaseToken = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/base-token`
        });
        return {
            loading: false,
            result: respData.data.list
        }
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}

export const getTokenPrice = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/base-token-price`
        });
        return {
            loading: false,
            price: respData.data.price,
            address: respData.data.address
        }
    }
    catch (err) {
        return {
            loading: false,
            price: 0,
            address: "",
            error: returnErr(err)
        }
    }
}

export const getTokenLogo = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/get-token-logo`,
            'data': data
        });
        return {
            loading: false,
            logo: respData.data.logo
        }
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}

export const addNewToken = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/add-token`,
            'data': data
        });
        return {
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}



export const currencyList = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=binancecoin,pancakeswap-token,binance-usd,binance-bitcoin,binance-peg-cardano,binance-peg-dogecoin`
        });
        return {
            loading: false,
            result: respData.data
        }
    }
    catch (err) {

        return {
            loading: false,
            error: returnErr(err)
        }
    }
}

export const allTokenList = async (data) => {

    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/all-token-list`
        });
        return {
            loading: false,
            result: respData.data.list
        }
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


