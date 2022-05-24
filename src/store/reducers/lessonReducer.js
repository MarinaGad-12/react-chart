import {
  SET_LOADING,
  GET_ALL_LESSONS,
  GET_LESSON_BY_ID,
} from '../actions/types';
const initialState = {
  lessons: [],
  lesson: null,
  loading: true,
};

const lessons = (state = initialState, action) => {
  const { type, payload } = action;
  // reducer look at each action to decide what will happen
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_LESSONS:
      return {
        ...state,
        lessons: payload,
        loading: false,
      };
    case GET_LESSON_BY_ID:
      return {
        ...state,
        lesson: payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default lessons;
