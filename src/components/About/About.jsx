import React, { PropTypes, Component } from 'react'
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';

export default class About extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleTouchTap() {
    this.setState({ open: true });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Okey"
        secondary={true}
        onTouchTap={this.handleRequestClose}
      />
    );
    return (
      <Card style={{width: 600, textAlign: "center", margin: "auto", padding: "2em"}}>
        <Dialog
          open={this.state.open}
          title="Super Secret Password"
          actions={standardActions}
          onRequestClose={this.handleRequestClose}
        >
          1-2-3-4-5
        </Dialog>
        <CardMedia style={{height: "250px"}}>
          <img src='quizzes.svg' style={{width: "250px", height: "250px"}} />
        </CardMedia>
        <h1>Quizzes</h1>
        <p>Welcome to Quizzes</p>
        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this.handleTouchTap} />
      </Card>
    );
  }
}
