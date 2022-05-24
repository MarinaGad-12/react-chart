import axios from 'axios';
import URI from '../../api/URI';
import { SET_LOADING, GET_ALL_LESSONS, GET_LESSON_BY_ID } from './types';

// action setLoading when the data is still loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// action to get all lessons
export const getAllLessons = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URI}`);
    dispatch({
      type: GET_ALL_LESSONS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      payload: error,
    });
  }
};

export const getLessonById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${URI}/${id}`);
    dispatch({
      type: GET_LESSON_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      payload: error,
    });
  }
};
