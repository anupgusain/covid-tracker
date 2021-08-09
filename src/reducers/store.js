import { combineReducers, createStore } from "redux";
import { calculationReducer } from "../reducers/reducer.js";

const createReducer = combineReducers({
    calculationReducer: calculationReducer,
});

const store = createStore(createReducer);
export default store;
