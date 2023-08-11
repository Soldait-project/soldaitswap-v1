import axios from 'axios'
import config from '../config/config'

const baseUrl = config.baseUrl

export const AddFaq = async (data) => {
    try {
        console.log(data,'data')
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/faq`,
            data: data,
         
        })
        return {
            message: respData.data.message,
            success: respData.data.success
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}
export const getFaq = async (data) => {
    try {
       
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/faq?skip=` +
            data.skip +
            `&limit=` +
            data.limit,
            
         
        })
        return {
            result: respData.data.result,
            success: respData.data.success,
            totalrecords: respData.data.totalrecords,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
}

export const updateFaq = async (data) => {
    try {
       
        let respData = await axios({
            method: 'put',
            url: `${baseUrl}/faq`,
            data: data,
         
        })
        return {
            message: respData.data.message,
            success: respData.data.success
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