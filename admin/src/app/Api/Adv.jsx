import axios from 'axios'
import config from '../config/config'

const baseUrl = config.baseUrl

export const swapAdv = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/update-swap-adv`,
            data: data,
            headers: {
                'content-type': 'multipart/form-data',
            },
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

export const getAdv = async (data) => {
    try {
        let respData = await axios({
            method: 'get',
            url: `${baseUrl}/get-adv?advtype=` + data,
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

export const liqutityAdv = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/update-liqutity-adv`,
            data: data,
            headers: {
                'content-type': 'multipart/form-data',
            },
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

export const farmsAdv = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/update-farms-adv`,
            data: data,
            headers: {
                'content-type': 'multipart/form-data',
            },
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

export const poolsAdv = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/update-pools-adv`,
            data: data,
            headers: {
                'content-type': 'multipart/form-data',
            },
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

export const referalAdv = async (data) => {
    try {
        let respData = await axios({
            method: 'post',
            url: `${baseUrl}/update-referal-adv`,
            data: data,
            headers: {
                'content-type': 'multipart/form-data',
            },
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

function returnErr(err) {
    if (err.response && err.response.data && err.response.data.errors) {
        return err.response.data.errors
    } else {
        return ''
    }
}
