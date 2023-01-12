import {
    IS_ELIGIBLE
} from '../constant';

const initialState = {
    eligible: "yes",
   
};

const isEligible = (state = initialState, action) => {
    switch (action.type) {
        case IS_ELIGIBLE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
export default isEligible;