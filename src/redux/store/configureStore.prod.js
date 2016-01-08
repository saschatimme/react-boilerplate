import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';


const finalCreateStore = compose(
  // Middleware you want to use in production:
  applyMiddleware(thunkMiddleware),
  // Other store enhancers if you use any
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(require('../reducers.js'), initialState);
};
