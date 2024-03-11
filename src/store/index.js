import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";

const middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, middlewares);
export default store;
