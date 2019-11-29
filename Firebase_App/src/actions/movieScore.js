import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const getScore = movieCd => async dispatch => {
  let url = "/api/movieScore/";
  url += movieCd;
  await axios
    .get(url)
    .then(res => {
      if (res.data) {
        dispatch({
          type: types.GET_SCORE,
          payload: res.data
        });
      } else {
        dispatch({
          type: types.GET_SCORE,
          payload: []
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.res.data, err.res.status));
    });
};
