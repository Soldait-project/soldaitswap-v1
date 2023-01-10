import axios from '../config/axios'
import config from '../config/config'

const baseUrl = config.p2pUrl

export const Addcurrency = async (data) =>{
   
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/adminApi/currency`,
            data: data, 
        })
        
        return {
            result: respData.data.result,
            message: respData.data.message,
            success:respData.data.success
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
    
};
export const getcurrency = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/adminApi/currency?skip=` +
                data.skip +
                `&limit=` +
                data.limit,
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
}
export const Updatecurrency = async (data) =>{
   
    try {
        let respData = await axios({
            method: 'put',
            url:`${baseUrl}/adminApi/currency`,
            data: data, 
        })
        
        return {
            result: respData.data.result,
            message: respData.data.message,
            success:respData.data.success
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
    
};
function returnErr(err) {
    if (err.response && err.response.data && err.response.data.errors) {
        return err.response.data.errors
    } else {
        return ''
    }
}