import { createStore, applyMiddleware, compose } from "redux";
import { browserHistory } from "react-router";
import { syncHistory } from "react-router-redux";
import thunkMiddleware from "redux-thunk";

const reduxRouterMiddleware = syncHistory(browserHistory);

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunkMiddleware, reduxRouterMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f

)(createStore);

export default function configureStore (initialState) {

  const reducer = require("../reducers");
  const store = finalCreateStore(reducer, initialState);

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
