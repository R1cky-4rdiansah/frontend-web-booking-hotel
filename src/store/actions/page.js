import { FETCH_PAGE, DELETE_OBJECT } from "store/types";
import axios from "axios";

export const fetchPage = (url, page, token) => (dispatch) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.get(url).then((resp) => {
    dispatch({
      type: FETCH_PAGE,
      payload: {
        [page]: resp.data,
      },
    });
  });
};

export const myProfile = (url, page, token) => (dispatch) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(url).then((resp) => {
    dispatch({
      type: FETCH_PAGE,
      payload: {
        [page]: resp.data,
      },
    });
  });
};

export const deleteObject = (name) => (dispatch) => {
  dispatch({
    type: DELETE_OBJECT,
    payload: name,
  });
};
