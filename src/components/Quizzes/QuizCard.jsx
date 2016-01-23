import React, { PropTypes, Component } from 'react'

import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import RaisedButton from 'material-ui/lib/raised-button'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Snackbar from 'material-ui/lib/snackbar'
import Dialog from 'material-ui/lib/dialog'

import ArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import ArrowDropUp from 'material-ui/lib/svg-icons/navigation/arrow-drop-up'
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more'
import ExpandLess from 'material-ui/lib/svg-icons/navigation/expand-less'
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward'
import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right'
import Check from 'material-ui/lib/svg-icons/navigation/check'
import Close from 'material-ui/lib/svg-icons/navigation/close'
import { Colors } from 'material-ui/lib/styles'

const smallSize = 450;
const mediumSize = 550;

const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


class QuizCard extends Component {
  constructor() {
    super();
    this.state = {
      snackbarOpen: false,
      message: '',
      notice: '',
      answered: false,
      moreInfo: false,
      correctAnswer: '',
      incorrectAnswer: '',
      medium: false,
    }
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
    measurements: PropTypes.object,
  }

  openSnackbar = () => {
    this.setState({
      snackbarOpen: true,
    })
  }

  closeSnackbar = () => {
    this.setState({
      snackbarOpen: false,
    });
  }

  componentDidMount() {
    const { choices, entries, index, answers } = this.props.current

    this.setState({
      answered: entries[index].id in answers,
    })
    for (let choice of choices) {
      let correct = choice === entries[index].classification
      if (correct) {
        this.setState({
          correctAnswer: choice,
        })
      } else {
        this.setState({
          incorrectAnswer: choice,
        })
      }
    }
  }

  getButtons() {
    const { choices, entries, index } = this.props.current

    let list = []
    const palette = this.context.muiTheme.baseTheme.palette
    for (let choice of choices) {
      let correct = choice === entries[index].classification
      let handler = correct ? this.handleSuccess : this.handleFailure
      let disabledColor = correct ? palette.accent2Color : palette.accent3Color
      list.push(
        <RaisedButton
          key={choice}
          disabled={this.state.answered}
          disabledBackgroundColor={disabledColor}
          backgroundColor={palette.primary2Color}
          onTouchTap={handler}
          label={choice}
        />
      )
    }
    return list
  }

  handleSuccess = () => {
    let notices = ['lol', 'omg', 'wow', 'nice', 'yayy']
    this.props.submitAnswer(this.state.correctAnswer)

    this.setState({
      message: 'Correct Answer!',
      notice: notices[Math.floor(Math.random() * notices.length)],
      answered: true,
      snackbarOpen: true,
    })

    this.handleCompletion()
  }

  handleFailure = () => {
    let notices = ['lol', 'omg', 'ohno', 'oops', 'nooo']
    this.props.submitAnswer(this.state.incorrectAnswer)

    this.setState({
      message: 'Incorrect Answer!',
      notice: notices[Math.floor(Math.random() * notices.length)],
      answered: true,
      snackbarOpen: true,
    })

    this.handleCompletion()
  }

  handleCompletion = () => {
    const { answers, id, score, entries } = this.props.current
    if (Object.keys(answers).length >= Object.keys(entries).length - 1)
      // push completed score to firebase here because cannot do so in action / reducer
      this.props.firebaseRef.child('scores').child(id).child(score).push(this.props.name)
      this.props.submitResponse()
  }

  getDescription() {
    let text = <CardText style={{paddingTop: 0}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    return text
  }

  getTitle() {
    let menuItems = []
    const { entries, index, answers, choices, id, score, title } = this.props.current
    const entry = entries[index]
    const size = Object.keys(entries).length

    for (let i = 0; i < size; i++) {
      menuItems.push(
        <MenuItem key={`Q${i+1}`} value={i} label={i+1} primaryText={`Q${i+1}`} />
      )
    }
    menuItems.push(<MenuItem key="Results" value={size+1} label="Results" primaryText="Results" />)
    return (
      <span>
        <span>{entry.name}</span>
        <DropDownMenu labelStyle={{paddingRight: 36}} underlineStyle={{opacity: 0}} style={{position: "absolute", top: 6, right: 0}} value={index}>
          {menuItems}
        </DropDownMenu>
      </span>
    )
  }

  moreInfo = () => {
    this.setState({
      moreInfo: !this.state.moreInfo,
    })
  }

  render() {
    const { index, entries, answers } = this.props.current
    const entry = entries[index]
    const size = Object.keys(entries).length

    const start = index === 0
    const end = !(index < size - 1 || entry.id in answers)

    const styles = {
      card: {
        maxWidth: 700,
        margin: "auto",
      },
      media: {
        minHeight: 400,
        maxWidth: 700,
        background: `url(${entry.image_root + entry.images[0]}) center`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
    }

    const standardActions = (
      <FlatButton
        label="Okey"
        secondary={true}
        onTouchTap={this.moreInfo}
      />
    )

    const mediumScreen = document.body.clientWidth > this.context.measurements.mediumScreen
    let cardActions = null
    if (mediumScreen) {
      cardActions = <CardActions>
        <IconButton disabled={start} style={{verticalAlign: "middle"}} onTouchTap={this.props.prev}><ChevronLeft/></IconButton>
        {this.getButtons()}
        <IconButton disabled={end && !this.props.current.submitted} style={{verticalAlign: "middle"}} onTouchTap={this.props.next}><ChevronRight/></IconButton>
        <FlatButton label="Back to Quiz Select" onTouchTap={this.props.removeCurrent} />
      </CardActions>
    } else {
      cardActions = <CardActions>
        {this.getButtons()}
        <br/>
        <IconButton disabled={start} style={{verticalAlign: "middle"}} onTouchTap={this.props.prev}><ChevronLeft/></IconButton>
        <IconButton disabled={end && !this.props.current.submitted} style={{verticalAlign: "middle"}} onTouchTap={this.props.next}><ChevronRight/></IconButton>
        <FlatButton label="Back to Quiz Select" onTouchTap={this.props.removeCurrent} />
      </CardActions>
    }

    return (
      <div className="quiz">
        <Card style={styles.card}>
          <CardTitle title={this.getTitle()} />
          <CardMedia style={styles.media}>
          </CardMedia>
          {cardActions}
        </Card>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.message}
          action={this.state.notice}
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

export default QuizCard;
