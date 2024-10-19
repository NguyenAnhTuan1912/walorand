import { combineReducers, createStore } from "redux";

import accountReducer from "./account";

const allReducers = combineReducers({
  account: accountReducer,
});

const store = createStore(allReducers);

export default store;
