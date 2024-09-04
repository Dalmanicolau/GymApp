import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const GET_PAYMENTS = "GET_PAYMENTS";

export const getPayments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/payments`);
      dispatch({
        type: GET_PAYMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error, "error en getPayments action");
    }
  };
};
