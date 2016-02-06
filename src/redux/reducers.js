import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routeReducer } from "react-router-redux";

module.exports = combineReducers({
  form: formReducer,
  routing: routeReducer,
});
