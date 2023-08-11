import axios from 'axios'
import config from '../config/config'

const baseUrl = config.baseUrl


export const siteurl = async (data) => {
    try {
        console.log(data,'api')
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/site-social-url`,
            data: data,
        })
        return {
            message: respData.data.message,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const getUrlList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/get-social-url`,
        })
        console.log(respData.data.data,'apidata')
        return {
            result: respData.data.data,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const gettemplate = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/get-site-template?identifier=${data}`,
        })
        console.log(respData.data.data,'apidata')
        return {
            result: respData.data.result,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const getdetails = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/admin-total-details`,
        })
        return {
            totalusers: respData.data.totalusers,
            totalswapping: respData.data.totalswapping,
            totalliqutity: respData.data.totalliqutity,
            liqutitychart: respData.data.liqutitychart,
            swapchart: respData.data.swapchart,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const getuserMailList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:`${baseUrl}/subscribers-list?skip=` +
                data.skip +
                `&limit=` +
                data.limit+
                `&search=` +
                data.search,
        })
        console.log(respData.data.data,'apidata')
        return {
            result: respData.data.data,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const deletesubscribers = async (data) =>{
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-delete-subscribers`,
            data: data, 
        })
        return {
            result: respData.data.result,
            totalrecords: respData.data.totalrecords,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
    
};

export const getuserMail = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/get-news-letter-subscriber`,
        })
        console.log(respData.data.data,'apidata')
        return {
            result: respData.data.data,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const sendnewsletter = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/send-news-letter`,
            data: data,
        })
        return {
            message: respData.data.message,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const updateTemplate = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/update-site-template`,
            data: data,
        })
        return {
            message: respData.data.message,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const forgotpassword = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/forgot-password`,
            data: data,
        })
        return {
            message: respData.data.message,
            status: respData.data.status,
            error: respData.data.error,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const updateAPY = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/update-APY`,
            data: data,
        })
        return {
            message: respData.data.message,
            status: respData.data.status,
            error: respData.data.error,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}


export const getAPY = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/get-APY`,
        })
        console.log(respData.data.data,'apidata')
        return {
            result: respData.data.data,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}


export const getverify = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/verify-url`,
            data: data,
        })
        return {
            message: respData.data.message,
            state: respData.data.reply
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}



export const resetpassword = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/reset-password`,
            data: data,
        })
        return {
            message: respData.data.message,
            state: respData.data.reply
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}


function returnErr(err) {
    if (err.response && err.response.data && err.response.data.errors) {
        return err.response.data.errors
    } else {
        return ''
    }
}
