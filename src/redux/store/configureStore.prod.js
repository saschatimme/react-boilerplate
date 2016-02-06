import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistory } from "react-router-redux";
import thunkMiddleware from "redux-thunk";

const reduxRouterMiddleware = syncHistory(browserHistory);
const finalCreateStore = compose(
  // Middleware you want to use in production:
  applyMiddleware(thunkMiddleware, reduxRouterMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  // Other store enhancers if you use any
)(createStore);

export default function configureStore (initialState) {
  return finalCreateStore(require("../reducers.js"), initialState);
}
