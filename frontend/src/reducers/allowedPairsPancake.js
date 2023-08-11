// import constant
import {
    ALLOWED_PAIRS_PANCAKE
} from '../constant';

const initialState = {
    pairspancake: ""
};

const walletConnection = (state = initialState, action) => {
    switch (action.type) {
        case ALLOWED_PAIRS_PANCAKE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default walletConnection;