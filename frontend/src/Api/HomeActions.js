import axios from "axios/dist/axios";
import config from "../config/config";

const baseUrl = config.baseUrl;

export const countDetails = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/count-details`,
            'data': data,
        });
        return {
            loading: false,
            'addressCount': (respData && respData.data && respData.data.addressCount) ?
                respData.data.addressCount : 0,
            'transCount': (respData && respData.data && respData.data.transCount) ?
                respData.data.transCount : 0,
            'totalGasfee': (respData && respData.data && respData.data.totalGasfee) ?
                respData.data.totalGasfee : 0,
        }
    }
    catch (err) {
        return {
            loading: false,
            'addressCount': 0,
            'transCount': 0,
            'totalGasfee': 0,
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


