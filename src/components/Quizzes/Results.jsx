import React, { PropTypes, Component } from 'react'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import IconButton from 'material-ui/lib/icon-button'
import CardText from 'material-ui/lib/card/card-text'
import DropDownMenu from 'material-ui/lib/drop-down-menu'

import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right'

export default class Results extends Component {

  constructor(props) {
    super(props)

    this.state = {
      onresize: null,
    }
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  componentDidMount() {
    const WIDTH_IN_PERCENT_OF_PARENT = 100
    const HEIGHT_IN_PERCENT_OF_PARENT = 100

    const { palette } = this.context.muiTheme.baseTheme

    let gd3 = d3.select('#plot')
                .append('div')
                .style({
                  width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                  'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

                  height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
                  'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh',
                })

    let x = [ 9, 12,  7,  8,  7, 10,  8, 12,  8, 10,  5, 12,  2,  4,  9,  1, 12,
        1, 12, 10,  2,  5, 10,  3, 12,  6,  8, 11,  7,  9,  7,  1,  5,  6,
       11,  7,  1,  8,  1,  6,  5,  4,  6,  9,  8, 10,  5,  9,  9,  5,  8,
        5,  6, 12,  8,  8, 12,  8,  7,  1,  5, 10,  3,  4, 11,  1,  4,  6,
        8,  3,  3,  9, 11,  5,  6,  1,  1,  7,  5,  7, 12,  9,  9,  8,  9,
        5, 10,  9,  9,  7, 10, 12,  5, 11, 12,  7,  5,  7,  5, 10,  0]

    let you = 8
    let count = x.filter(function(k) { return k === you }).length

    let s = document.getElementById('plot')

    let trace = {
      x: x,
      histnorm: 'count',
      name: 'statistics',
      autobinx: false,
      xbins: {
        start: -0.5,
        end: 12,
        size: 1,
      },
      marker: {color: palette.primary1Color},
      opacity: 0.75,
      type: 'histogram',
    }

    let data = [trace]

    let layout = {
      title: 'Stats for {QuizName}',
      xaxis: {title: 'Score'},
      yaxis: {title: 'Count'},
      barmode: 'overlay',
      bargap: 0.1,
      bargroupgap: 0.1,
      showlegend: false,
      annotations: [
        {
          x: you,
          y: count,
          xref: 'x',
          yref: 'y',
          text: 'you',
          showarrow: true,
          font: {
            family: 'Roboto, monospace',
            size: 16,
            color: '#ffffff',
          },
          align: 'center',
          arrowhead: 6,
          arrowcolor: palette.accent1Color,
          ax: 0,
          ay: -30,
          bgcolor: palette.accent1Color,
          opacity: 0.8,
        },
      ],
    }

    let gd = gd3.node();

    Plotly.plot(gd, data, layout)

    if (window.onresize) {
      this.setState({
        onresize: window.onresize,
      })
    }

    window.onresize = function() {
      this.state.onresize()
      Plotly.Plots.resize(gd)
    }
  }

  componentWillUnmount() {
    window.onresize = this.state.onresize
  }

  render() {
    console.log(this)
    return (
      <Card style={{maxWidth: 700, margin: "auto"}}>
        <CardTitle title="This is the end of the quiz" subtitle={`You got 12/12 (100%)`} />
        <CardMedia>
          <div id="plot">
          </div>
        </CardMedia>
        <CardActions>
          <IconButton style={{verticalAlign: "middle"}} onTouchTap={this.props.prev}><ChevronLeft/></IconButton>
          <IconButton disabled={true} style={{verticalAlign: "middle"}}><ChevronRight/></IconButton>
          <RaisedButton label="Back to Quiz Selection" />
        </CardActions>
        <CardText>
          My nigga
        </CardText>
      </Card>
    )
  }
}
