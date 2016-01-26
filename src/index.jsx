import React from 'react'
import { render } from 'react-dom'
import Router from 'react-router'
import configureStore from './stores/configureStore'
import Root from './containers/Root'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

require('./style.scss')

let store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('app')
)
