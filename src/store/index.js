import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { appRootReducer } from "./reducer";
import { getData } from "./actions/index";

export const store = createStore(appRootReducer, applyMiddleware(thunk));

store.dispatch(getData());
