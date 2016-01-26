import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import Routes from '../routes/'
import { browserHistory, Router, Route } from 'react-router'

export default class Root extends React.Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <DevTools />
          <Router history={browserHistory}>
            {Routes}
          </Router>
        </div>
      </Provider>
    )
  }
}
