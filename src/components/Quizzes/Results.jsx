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
      displayMessage: true,
      leaderboard: false,
    }
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  componentDidMount() {
    const average = (scores) => {
      return scores.reduce((sum, value) => sum + value, 0) / scores.length
    }

    const standardDeviation = (scores) => {
      const avge = average(scores)
      const squareDiffs = scores.map((value) => (value - avge) * (value - avge))
      return Math.sqrt(average(squareDiffs))
    }

    const WIDTH_IN_PERCENT_OF_PARENT = 100
    const HEIGHT_IN_PERCENT_OF_PARENT = 60

    const { palette } = this.context.muiTheme.baseTheme
    const { entries, id, score, title } = this.props.current
    const scores = this.props.scores[id]
    const size = Object.keys(entries).length

    let gd3 = d3.select('#plot')
                .append('div')
                .style({
                  width: WIDTH_IN_PERCENT_OF_PARENT + '%',
                  marginLeft: (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',
                  height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
                })

    const x = Object.keys(scores)
                  .map(k => {
                    return Array.apply(null, Array(Object.keys(scores[k]).length))
                                .map(() => Number(k))
                  })
                  .reduce((prev, curr) => prev.concat(curr))
    const lengths = Object.keys(scores)
                     .map(k => Object.keys(scores[k]).length)
    const maxLength = Math.max.apply(Math, lengths)
    const avg = Math.round(average(x) * 100) / 100
    const stdev = Math.round(standardDeviation(x) * 100) / 100
    console.log(maxLength)

    const count = x.filter(k => k === score).length

    const trace = {
      x: x,
      histnorm: 'count',
      name: 'statistics',
      autobinx: false,
      xbins: {
        start: -0.5,
        end: size,
        size: 1,
      },
      marker: {color: palette.primary1Color},
      opacity: 0.75,
      type: 'histogram',
    }

    let data = [trace]

    let layout = {
      title: `${title}`,
      xaxis: {title: 'Score'},
      yaxis: {title: 'Count'},
      barmode: 'overlay',
      bargap: 0.1,
      bargroupgap: 0.1,
      showlegend: false,
      annotations: [
        {
          x: score,
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
        {
          x: score ? 0 : size,
          y: maxLength,
          xref: 'x',
          yref: 'y',
          text: `avg: ${avg}`,
          showarrow: false,
          font: {
            family: 'Roboto, monospace',
            size: 16,
            color: '#ffffff',
          },
          align: 'center',
          bgcolor: palette.accent1Color,
          opacity: 0.8,
        },
        {
          x: score ? 0 : size,
          y: maxLength * 0.80,
          xref: 'x',
          yref: 'y',
          text: `stdev: ${stdev}`,
          showarrow: false,
          font: {
            family: 'Roboto, monospace',
            size: 16,
            color: '#ffffff',
          },
          align: 'center',
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

    window.onresize = () => {
      if (this.state.onresize) {
        this.state.onresize()
      }
      Plotly.Plots.resize(gd)
    }
  }

  componentWillUnmount() {
    window.onresize = this.state.onresize
  }

  toggleLeaderboard() {
    this.setState({ leaderboard: !this.state.leaderboard })
  }

  render() {
    const { entries, id, score, title } = this.props.current
    const scores = this.props.scores[id]
    const size = Object.keys(entries).length
    let percentage = Math.round(score * 100 / size)
    let text = ''
    if (percentage === 100) {
      text = "Congratulations, You're #FLAWLESS"
    } else if (percentage > 66) {
      text = 'Impressive, you are probably familiar with '
    } else if (percentage > 33) {
      text = 'I guess, you probably guessed your way here'
    } else {
      text = 'Well, you may need to brush up on your identification ability.'
    }
    return (
      <div>
        <Card style={{maxWidth: 700, margin: "auto"}}>
          <CardTitle title={`You Got ${score}/${size} (${percentage}%)`} />
          <CardMedia>
            <div id="plot">
            </div>
          </CardMedia>
          <CardActions>
            <IconButton style={{verticalAlign: "middle"}} onTouchTap={this.props.prev}><ChevronLeft/></IconButton>
            <IconButton disabled={true} style={{verticalAlign: "middle"}}><ChevronRight/></IconButton>
            <RaisedButton label="Back to Quiz Select" onTouchTap={this.props.removeCurrent} />
            <RaisedButton label="Leaderboards" onTouchTap={this.toggleLeaderboard} />
          </CardActions>
          <CardText>
            {text}
          </CardText>
        </Card>
      </div>
    )
  }
}
