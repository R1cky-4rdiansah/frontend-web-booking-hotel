import { CHECKOUT_BOOKING } from "../types";

const initailState = null;

export default function (state = initailState, action) {
  switch (action.type) {
    case CHECKOUT_BOOKING:
      return action.payload;
    default:
      return state;
  }
}
