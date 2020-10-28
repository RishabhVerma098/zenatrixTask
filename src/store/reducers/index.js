import { combineReducers } from "redux";
import fruitsReducer from "./fruits";
import filterReducer from "./filter";
import addedReducer from "./added";
const rootReducers = combineReducers({
  fruitsReducer: fruitsReducer,
  filterReducer: filterReducer,
  addedReducer: addedReducer,
});

export default rootReducers;
