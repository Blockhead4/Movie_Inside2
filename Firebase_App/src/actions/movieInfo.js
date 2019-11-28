import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const movieInfo = searchInfo => async dispatch => {
  let url = "/api/movieInfo";
  // url = url + "?search=" + searchInfo;
  await axios
    .get(url)
    .then(res => {
      dispatch({
        type: types.GET_MOVIE_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.res.data, err.res.status));
    });
};

export const recentMovieInfo = searchInfo => async dispatch => {
  let url = "/api/movieInfo";
  // url = url + "?search=" + searchInfo;
  await axios
    .get(url)
    .then(res => {
      dispatch({
        type: types.GET_RECENT_MOVIE_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.res.data, err.res.status));
    });
};

export const clearMovieInfo = () => dispatch => {
  return {
    type: types.CLEAR_MOVIE_INFO
  };
};

export const collaboToDetail = data => {
  return {
    type: types.COLLABO_TO_DETAIL,
    payload: data
  };
};
