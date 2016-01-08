require('babel-polyfill');

import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import { render } from 'react-dom';
import configureStore from './redux/store/configureStore';
import { Root } from './containers';
import { App } from './Pages';

const store = configureStore();

syncReduxAndRouter(browserHistory, store);

render(
    <Root store={store} >
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
    </Root>,
    document.getElementById('root')
);
