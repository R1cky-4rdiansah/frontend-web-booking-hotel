import { applyMiddleware, compose, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";

const initailState = {};

const middleware = [thunk];

const store = legacy_createStore(
  rootReducer,
  initailState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
