require("babel-polyfill");

import React from "react";
import { browserHistory, Router, Route } from "react-router";
import { Provider } from "react-redux";
import { render } from "react-dom";
import configureStore from "./redux/store/configureStore";
import { App } from "./containers";

const store = configureStore();

render(
    <Provider store = { store }>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
