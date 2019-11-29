import * as types from "./actionTypes";
import axios from "axios";
import { getErrors } from "./messages";

export const tokenConfig = getState => {
  //state에서 token을 가져옴
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

//Register User
export const register = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = { username, password };
  await axios
    .post("/api/auth/register_process", body, config)
    .then(res => {
      dispatch({
        type: types.REGISTRATION_SUCCESSFUL,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.REGISTRATION_FAILED
      });
    });
};

//Login User
export const login = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = { username, password };

  await axios
    .post("/api/auth/login_process", body, config)
    .then(res => {
      // console.log(res);
      dispatch({
        type: types.LOGIN_SUCCESSFUL,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.LOGIN_FAILED
      });
    });
};

export const logout = () => async (dispatch, getState) => {
  await axios
    .get("/api/auth/logout_process", null, tokenConfig(getState))
    .then(res => {
      // console.log(res);
      dispatch({
        type: types.LOGOUT_SUCCESSFUL
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: types.USER_LOADING
  });
  await axios
    .get("/api/user", tokenConfig(getState))
    .then(res => {
      // console.log(res);
      dispatch({
        type: types.USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);

      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.AUTHENTICATION_ERROR
      });
    });
};

// load user custom
export const loadUserProfile = () => async (dispatch, getState) => {
  dispatch({
    type: types.USER_PROFILE_LOADING
  });
  await axios
    .get("/api/user/profile", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: types.USER_PROFILE_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);

      dispatch(() => getErrors(err.response.data, err.response.status));
      dispatch({
        type: types.AUTHENTICATION_ERROR
      });
    });
};
