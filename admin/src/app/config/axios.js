// import packages
import axios from 'axios'

// import lib
import config from '../config/config'
import { getAuthToken } from '../../lib/localStorage'

axios.defaults.baseURL = config.p2pUrl
axios.defaults.headers.common['Authorization'] = getAuthToken()

export const setAuthorization = (token) => {
  axios.defaults.headers.common['Authorization'] = token
}
export default axios