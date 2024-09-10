// src/redux/reducers/memberReducer.js
import { ADD_MEMBER, SET_MEMBERS, SET_ERROR } from '../actions/Member';

const initialState = {
  members: [],
  error: null,
};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBERS:
      return { ...state, members: action.payload };
    case ADD_MEMBER:
      return { ...state, members: [...state.members, action.payload] };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default memberReducer;
