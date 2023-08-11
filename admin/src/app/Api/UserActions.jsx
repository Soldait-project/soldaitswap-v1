import axios from "axios";
import config from "../config/config";

const baseUrl = config.baseUrl;

export const saveUser = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/register-user`,
            'data': data
        });
        return {
            message: respData.data.message,
            result: respData.data.result,
            errors: respData.data.errors,
        }
    }
    catch (err) {
        return {
            errors: returnErr(err)
        }
    }
}


export const activateUser = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/activate-account`,
            'data': data
        });
        return {
            message: respData.data.message
        }
    }
    catch (err) {
        return {
            errors: returnErr(err)
        }
    }
}

export const loginCheck = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/login`,
            'data': data
        });
        return {
            message: respData.data.success,
            errors: respData.data.errors,
            token: respData.data.token,
        }
    }
    catch (err) {
        return {
            errors: err.data.errors,
        }
    }
}

export const getCSVreport = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/userlist-CSV-report?type=` + data.type,
        })
        return {
            result: respData.data.result,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const getsuscribersCSVreport = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/suscriberslist-CSV-report?type=` + data.type,
        })
        return {
            result: respData.data.result,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const getswapCSVreport = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/swaplist-CSV-report?type=` + data.type,
        })
        return {
            result: respData.data.result,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const getliqutityCSVreport = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/liqutity-CSV-report?type=` + data.type,
        })
        return {
            result: respData.data.result,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
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


