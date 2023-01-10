import axios from "axios/dist/axios";
import config from "../config/config";

const baseUrl = config.baseUrl;


export const getFormData = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `${baseUrl}/get-forms`,
            'data': data,
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


