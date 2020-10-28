import { combineReducers } from "redux";
import fruitsReducer from "./fruits";
import filterReducer from "./filter";

const rootReducers = combineReducers({
  fruitsReducer: fruitsReducer,
  filterReducer: filterReducer,
});

export default rootReducers;
