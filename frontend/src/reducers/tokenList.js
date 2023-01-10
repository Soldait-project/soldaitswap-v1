import {
    TOKEN_LIST
} from '../constant';

const initialState = {
    list: "{}"
};

const tokenList = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN_LIST:
            return {
                ...state,
                list: { ...action.payload }
            };
        default:
            return state;
    }
}

export default tokenList;