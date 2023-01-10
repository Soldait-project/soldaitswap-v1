import { combineReducers } from "redux";

import web3Reucer from './webReducer';
import walletConnection from '../reducers/walletConnection';
import tokenList from '../reducers/tokenList';
import allowedPairs from '../reducers/allowedPairs'

export default combineReducers({
    web3Reucer,
    walletConnection,
    tokenList,
    allowedPairs
});