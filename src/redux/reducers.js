import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'redux-simple-router';

module.exports = combineReducers({
  form: formReducer,
  routing: routeReducer,
});
