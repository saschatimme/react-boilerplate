import React from 'react';
import {
    Provider
}
from 'react-redux';
import DevTools from '../DevTools/DevTools';

export default class Root extends React.Component {
  render() {
    return (
      <Provider store = {this.props.store} >
        <div>
          {this.props.children}
          <DevTools />
        </div>
      </Provider>
    );
  }
}
