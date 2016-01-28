import React, { PropTypes, Component } from 'react'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'

export default class About extends Component {

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  render() {
    const palette = this.context.muiTheme.baseTheme.palette

    return (
      <div style={{textAlign: "center", paddingTop: "2em"}}>
        <img src='images/quizzes/quizzes.svg' style={{width: "250px", height: "250px"}} />
        <h1>Quizzes</h1>
        <p>
          Welcome to Quizzes, a collection of themed quizzes about random
          things.
        </p>
        <p>
          To begin, click one of the buttons below
        </p>
        <RaisedButton
          primary={true}
          label="Sign In"
          style={{margin: 12}}
          onTouchTap={() => this.props.history.push('profile')}
        />
        <RaisedButton
          primary={true}
          label="Straight to Quizzes"
          style={{margin: 12}}
          onTouchTap={() => this.props.history.push('app')}
        />
      </div>
    )
  }
}
