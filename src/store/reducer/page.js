import { FETCH_PAGE, DELETE_OBJECT } from "store/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PAGE:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_OBJECT:
      delete state[action.payload];
      return {
        ...state,
      };

    default:
      return state;
  }
}
