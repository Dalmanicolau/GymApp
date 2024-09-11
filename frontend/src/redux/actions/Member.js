import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ADD_MEMBER = "ADD_MEMBER";
export const SET_MEMBERS = "SET_MEMBERS";
export const SET_ERROR = "SET_ERROR";

// Acción para agregar un miembro
export const addMember = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/members`, formData);
    const member = response.data;
    
    dispatch({ 
      type: ADD_MEMBER, 
      payload: member 
    });
    return member; // Asegúrate de retornar la data aquí para que registeredMember la reciba
  } catch (error) {
    console.error("Error al agregar miembro:", error);
  }
};

// Acción para renovar el plan de un miembro
export const renewMemberPlan = (memberId) => async (dispatch) => {
  try {
    const response = await axios.put(`${BASE_URL}/members/${memberId}/renew`);
    dispatch({
      type: 'RENEW_MEMBER_PLAN_SUCCESS',
      payload: response.data,
    });
    return response.data; 
  } catch (error) {
    dispatch({
      type: 'RENEW_MEMBER_PLAN_FAILURE',
      payload: error,
    });
    throw error; 
  }
};



// Acción para configurar los miembros en el estado
export const setMembers = (members) => ({
  type: SET_MEMBERS,
  payload: members,
});

// Acción para obtener los miembros
export const fetchMembers = (page = 1, limit = 10) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/members?page=${page}&limit=${limit}`);
    dispatch(setMembers(data));
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};
