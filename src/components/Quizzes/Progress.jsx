import React, { PropTypes, Component } from 'react'
import Card from 'material-ui/lib/card/card'
import CircularProgress from 'material-ui/lib/circular-progress'

export default class Progress extends Component {
  render() {
    return (
      <Card style={{maxWidth: 800, margin: "30px auto", padding: 50}}>
        <CircularProgress mode="indeterminate" size={5} />
      </Card>
    )
  }
}
