import { combineReducers } from "redux";

import web3Reucer from './webReducer';
import walletConnection from '../reducers/walletConnection';
import tokenList from '../reducers/tokenList';
import allowedPairs from '../reducers/allowedPairs';
import allowedPairsPancake from '../reducers/allowedPairsPancake'
import isEligible from './isEligible'

export default combineReducers({
    web3Reucer,
    walletConnection,
    tokenList,
    allowedPairs,
    allowedPairsPancake,
    isEligible
});