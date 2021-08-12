import { combineReducers, createStore } from "redux";
import { indexReducer } from "../reducers/index-reducer.js";

const createReducer = combineReducers({
    indexReducer: indexReducer,
});

const store = createStore(createReducer);
export default store;
