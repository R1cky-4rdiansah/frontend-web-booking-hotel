import axios from "axios";
import { CHECKOUT_BOOKING } from "../types";

export const checkOutBooking = (payload) => (dispatch) => {
  dispatch({
    type: CHECKOUT_BOOKING,
    payload: payload,
  });
};

export const submitBooking = (payload, token) => () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/booking-post`,
    payload,
    {
      headers: { contentType: "multipart/form-data" },
    }
  );
};

export const updateUser = (payload, token) => () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/update-profile`,
    payload
  );
};

export const detailOrder = (token, invoice) => () => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/detail-order/${invoice}`
  );
};
