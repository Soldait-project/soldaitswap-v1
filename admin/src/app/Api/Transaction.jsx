import axios from '../config/axios'
import config from '../config/config'

const baseUrl = config.p2pUrl
export const getDepositList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/adminApi/depositList?skip=` +
                data.skip +
                `&limit=` +
                data.limit,
        })
        console.log(respData,'depositList')
        return {
            result: respData.data.result.data,
            totalrecords: respData.data.result.count,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const ApproveFiatDeposit = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url:
                `${baseUrl}/adminApi/fiatDeposit/approve`,
                data:data
        })
        console.log(respData,'depositList')
        return {
            message: respData.data.message,
            success: respData.data.success,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const RejecetFiatDeposit = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url:
                `${baseUrl}/adminApi/fiatDeposit/reject`,
                data:data
        })
        console.log(respData,'depositList')
        return {
            message: respData.data.message,
            success: respData.data.success,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const getFiatWithdrawList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/adminApi/withdrawList?skip=` +
                data.skip +
                `&limit=` +
                data.limit,
        })
        console.log(respData,'depositList')
        return {
            result: respData.data.result.data,
            totalrecords: respData.data.result.count,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const RejecetFiatWithdraw = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/adminApi//fiatWithdraw/reject/`+data.transactionId,
                data:data
        })
        console.log(respData,'depositList')
        return {
            message: respData.data.message,
            success: respData.data.success,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const ApproveFiatWithdraw = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/adminApi//fiatWithdraw/approve/`+data.transactionId,
                data:data
        })
        console.log(respData,'depositList')
        return {
            message: respData.data.message,
            success: respData.data.success,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const RejecetCoinWithdraw = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/adminApi/coinWithdraw/reject/`+data.transactionId,
                data:data
        })
        console.log(respData,'depositList')
        return {
            message: respData.data.message,
            success: respData.data.success,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const ApprovecoinWithdraw = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/adminApi/coinWithdraw/approve/`+data.transactionId,
                data:data
        })
        console.log(respData,'wwwwwwwwww')
        return {
            message: respData.data.message,
            success: respData.data.success,
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