import { FETCH_PAGE } from "store/types";
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
