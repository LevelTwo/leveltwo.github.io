import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import Routes from '../routes/'
import Router, { Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

export default class Root extends React.Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <DevTools />
          <Router
            history={createBrowserHistory({queryKey: false})}
            onUpdate={() => window.scrollTo(0, 0)}
          >
            {Routes}
          </Router>
        </div>
      </Provider>
    )
  }
}
