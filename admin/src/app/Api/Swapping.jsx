import axios from 'axios'
import config from '../config/config'
import fs from 'fs'

const baseUrl = config.baseUrl

export const getHistory = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/admin-swap-history?skip=` +
                data.skip +
                `&limit=` +
                data.limit +
                `&search=`+
                data.search,
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

export const getLiqutityHistory = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/admin-liqutity-history?skip=` +
                data.skip +
                `&limit=` +
                data.limit+
                `&search=`+
                data.search,
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

export const getUserList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/admin-users-list?skip=` +
                data.skip +
                `&limit=` +
                data.limit+
                `&search=` +
                data.search,
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

export const getfarmsList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/admin-farms-list?skip=` +
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

export const getpoolsList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/admin-pools-list?skip=` +
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
export const gettokenList = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url:
                `${baseUrl}/admin-token-list?skip=` +
                data.skip +
                `&limit=` +
                data.limit +
                `&search=` +
                data.search
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

export const addForm = async (param) =>{
    var formData = new FormData();
    formData.append('pid', param.pid);
    formData.append('risk', 5);
    formData.append('lpSymbol', param.lpSymbol);
    // formData.append('alloc', param.alloc);
    formData.append('isTokenOnly', param.isTokenOnly);
    formData.append('lpAddresses', param.lpAddresses);
    formData.append('tokenSymbol', param.tokenSymbol);
    formData.append('tokenAddresses', param.tokenAddresses);
    formData.append('quoteTokenSymbol', param.quoteTokenSymbol);
    formData.append('quoteTokenAdresses', param.quoteTokenAdresses);
    formData.append('depositFee', param.depositFee);
    formData.append('withdrawFee', param.withdrawFee);
    formData.append('file', param.logoURI);
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-add-forms`,
            data: formData, 
        })
        console.log(respData,'apirespdata')
        return {
            result: respData.data.result,
            message: respData.data.message,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
    
};

export const addToken = async (param) =>{
   let newname = `${param.address.toLowerCase()}.png`
    var formData = new FormData();
    formData.append('name', param.name);
    formData.append('symbol', param.symbol);
    formData.append('decimals', param.decimals);
    formData.append('totalSupply', param.totalSupply);
    formData.append('address', param.address);
    formData.append('file', param.logoURI,newname);
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-add-token`,
            data: formData, 
        })
        console.log(respData,'apirespdata')
        return {
            result: respData.data.result,
            message: respData.data.message,
        }
    } catch (err) {
        return {
            errors: returnErr(err),
        }
    }
    
};
export const updateToken = async (param) =>{
    if(param.file){
   let newname = `${param.address.toLowerCase()}.png`
    }
    var formData = new FormData();
    formData.append('_id', param._id);
    formData.append('name', param.name);
    formData.append('symbol', param.symbol);
    formData.append('decimals', param.decimals);
    formData.append('totalSupply', param.totalSupply);
    formData.append('address', param.address);
    formData.append('file',param.file?param.logoURI:'');
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-update-token`,
            data: formData, 
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

export const updateForm = async (param) =>{
    var formData = new FormData();
    formData.append('_id', param._id);
    formData.append('pid', param.pid);
    formData.append('risk', 5);
    formData.append('lpSymbol', param.lpSymbol);
    formData.append('alloc', param.alloc);
    formData.append('isTokenOnly', param.isTokenOnly);
    formData.append('lpAddresses', param.lpAddresses);
    formData.append('tokenSymbol', param.tokenSymbol);
    formData.append('tokenAddresses', param.tokenAddresses);
    formData.append('quoteTokenSymbol', param.quoteTokenSymbol);
    formData.append('quoteTokenAdresses', param.quoteTokenAdresses);
    formData.append('depositFee', param.depositFee);
    formData.append('withdrawFee', param.withdrawFee);
    formData.append('file',param.file?param.logoURI:'');
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-update-forms`,
            data: formData, 
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

export const deleteForm = async (data) =>{
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-delete-forms`,
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

export const deleteToken = async (data) =>{
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-delete-token`,
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
export const StarToken = async (data) =>{
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-star-token`,
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

export const LockUser = async (data) =>{
    try {
        let respData = await axios({
            method: 'post',
            url:`${baseUrl}/admin-update-user`,
            data: data, 
        })
        return {
            message: respData.data.message,
            success: respData.data.success,
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
