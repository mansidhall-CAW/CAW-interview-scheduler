import {
  ADD_INTERVIEW,
  DELETE_INTERVIEW,
  UPDATE_INDEX,
  UPDATE_INTERVIEW,
  COMPLETE_INTERVIEW,
} from '../constants/actionTypes';

if (localStorage.getItem('interviews') == null)
  localStorage.setItem('interviews', JSON.stringify([]));

const initialState = {
  currentIndex: -1,
  interviews: JSON.parse(localStorage.getItem('interviews')),
};

const itemReducer = (state = initialState, action) => {
  const list = JSON.parse(localStorage.getItem('interviews'));

  switch (action.type) {
    case ADD_INTERVIEW:
      list.push(action.payload);
      localStorage.setItem('interviews', JSON.stringify(list));
      return {
        ...state,
        interviews: JSON.parse(localStorage.getItem('interviews')),
      };
    case DELETE_INTERVIEW:
      list.splice(action.payload, 1);
      localStorage.setItem('interviews', JSON.stringify(list));
      return {
        ...state,
        interviews: JSON.parse(localStorage.getItem('interviews')),
      };
    case UPDATE_INDEX:
      return {
        ...state,
        currentIndex: action.payload,
      };
    case UPDATE_INTERVIEW:
      list[state.currentIndex] = action.payload;
      localStorage.setItem('interviews', JSON.stringify(list));
      return {
        currentIndex: -1,
        interviews: JSON.parse(localStorage.getItem('interviews')),
      };
    case COMPLETE_INTERVIEW:
      list[state.currentIndex].completed = action.payload;
      localStorage.setItem('interviews', JSON.stringify(list));
      return {
        ...state,
        interviews: JSON.parse(localStorage.getItem('interviews')),
      };
    default:
      return state;
  }
};

export default itemReducer;
