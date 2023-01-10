import axios from "axios/dist/axios";
import config from "../config/config";

const baseUrl = config.baseUrl;


export const getPoolData = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/get-pools`,
            'data': data,
        });
        return {
            loading: false,
            result: respData.data.list,
            address: respData.data.address
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


