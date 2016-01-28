import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import Routes from '../routes'
import Router, { Route, browserHistory } from 'react-router'

export default class Root extends React.Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router
          history={browserHistory}
          onUpdate={() => window.scrollTo(0, 0)}
        >
          {Routes}
        </Router>
      </Provider>
    )
  }
}
