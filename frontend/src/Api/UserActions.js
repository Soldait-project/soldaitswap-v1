import axios from "axios/dist/axios";
import config from "../config/config";

const baseUrl = config.baseUrl;
axios.defaults.headers.common['Authentication'] = localStorage.getItem('khdbfty') ? localStorage.getItem('khdbfty') : "";

export const userlogin = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/save-users`,
            'data': data,
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
export const getUpliner = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/get-upliner`,
            'data': data,
        });
        return {
            loading: false,
            result: respData.data.refaddress
        }
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}

export const updateUpliner = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/update-liner`,
            'data': data,
        });
        return {
            loading: false,
            result: respData.data.message
        }
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}

export const referalDetails = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/referal-details`,
            'data': data,
        });
        return {
            loading: false,
            result: respData.data.result,
            commisions: respData.data.commisions,
            referalCount: respData.data.referalCount,
            userDeatil: respData.data.userDeatil,
            percenatge: respData.data.levelpercenatge,
            totalearnUSD: respData.data.totalearnUSD,
            totalearnBNB: respData.data.totalearnBNB,
        }
    }
    catch (err) {
        return {
            loading: false,
            result: [],
            commisions: 0,
            userDeatil: {},
            percenatge: {},
            totalUSD: 0,
            totalBNB: 0,
            error: returnErr(err)
        }
    }
}

export const subscribeMail = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/subscribe`,
            'data': data,
        });
        return {
            loading: false,
            result: respData.data.message
        }
    }
    catch (err) {
        return {
            loading: false,
            result: [],
            commisions: 0,
            error: returnErr(err)
        }
    }
}

export const getSettings = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/get-settings`
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

export const gettemplate = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/site-template?identifier=` + data
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

export const claimReferal = async (data, authValue) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/claim-reward`,
            'data': data,
            'headers': { 'nvgftyu': localStorage.getItem('khdbfty'), 'vfdrtey': authValue }
        });
        return {
            loading: false,
            txid: respData.data.txid
        }
    }
    catch (err) {
        return {
            loading: false,
            txid: "",
            error: returnErr(err)
        }
    }
}

export const claimDetails = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/get-claim-amount`,
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
            result: [],
            commisions: 0,
            error: returnErr(err)
        }
    }
}
export const checkUser = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/check-users`,
            'data': data,
        });
        return {
            loading: false,
            status: respData.data.status
        }
    }
    catch (err) {
        return {
            loading: false,
            error: returnErr(err)
        }
    }
}
export const getAllFaq = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `${baseUrl}/faq`,
       
        });
        console.log(respData,'respData')
        return {
            loading: false,
            result: respData.data.result,
            status: respData.data.status
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


