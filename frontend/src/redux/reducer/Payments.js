import { GET_PAYMENTS } from "../actions/Payments";

const initialState = {
    payments: [],
    };

const Payments = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENTS:
            return {
                ...state,
                payments: action.payload,
            };
        default:
            return state;
    }
}

export default Payments;
