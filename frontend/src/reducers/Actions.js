import {
    SET_WEB3,
    WALLET_CONNECT,
    TOKEN_LIST,
    ALLOWED_PAIRS,
    ALLOWED_PAIRS_PANCAKE,
    IS_ELIGIBLE
} from '../constant';

export const setWeb3 = details => {
    return {
        type: SET_WEB3,
        payload: details
    };
};
export const setEligible = details => {
    return {
        type: IS_ELIGIBLE,
        payload: details
    };
};
export const setWallet = details => {
    return {
        type: WALLET_CONNECT,
        payload: details
    };
};

export const setTokens = details => {
    return {
        type: TOKEN_LIST,
        payload: details
    };
};

export const setPairs = details => {
    return {
        type: ALLOWED_PAIRS,
        payload: details
    };
};
export const setPairsPancake = details => {
    return {
        type: ALLOWED_PAIRS_PANCAKE,
        payload: details
    };
};