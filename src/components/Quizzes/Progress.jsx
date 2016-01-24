import React, { PropTypes, Component } from 'react'
import CircularProgress from 'material-ui/lib/circular-progress'

export default class Progress extends Component {
  render() {
    return (
      <CircularProgress mode="indeterminate" size={6} style={{marginLeft: "50%"}} />
    )
  }
}
