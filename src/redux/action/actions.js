import {
  ADD_INTERVIEW,
  UPDATE_INTERVIEW,
  UPDATE_INDEX,
  DELETE_INTERVIEW,
  COMPLETE_INTERVIEW,
} from '../constants/actionTypes';

export const addInterview = (interview) => ({
  type: ADD_INTERVIEW,
  payload: interview,
});

export const updateIndex = (index) => ({
  type: UPDATE_INDEX,
  payload: index,
});

export const updateInterview = (interview) => ({
  type: UPDATE_INTERVIEW,
  payload: interview,
});

export const deleteInterview = (id) => ({
  type: DELETE_INTERVIEW,
  payload: id,
});

export const completeInterview = (value) => ({
  type: COMPLETE_INTERVIEW,
  payload: value,
});
