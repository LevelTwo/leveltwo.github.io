import React, { PropTypes, Component } from 'react'

import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardMedia from 'material-ui/lib/card/card-media'
import CardTitle from 'material-ui/lib/card/card-title'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Snackbar from 'material-ui/lib/snackbar'
import Dialog from 'material-ui/lib/dialog'

import ChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right'
import Check from 'material-ui/lib/svg-icons/navigation/check'
import Close from 'material-ui/lib/svg-icons/navigation/close'
import Colors from 'material-ui/lib/styles/colors'

export default class QuizCard extends Component {

  constructor() {
    super()
    this.state = {
      snackbarOpen: false,
      message: '',
      notice: '',
      answered: false,
      correct: false,
      moreInfo: false,
      correctAnswer: '',
      incorrectAnswer: '',
      medium: false,
      large: false,
      small: false,
    }
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
    measurements: PropTypes.object,
  }

  openSnackbar = () => {
    this.setState({ snackbarOpen: true })
  }

  closeSnackbar = () => {
    this.setState({ snackbarOpen: false })
  }

  componentWillMount() {
    const { choices, entries, index, answers } = this.props.current

    this.setState({ answered: entries[index].id in answers })

    this.handleResize()

    for (let choice of choices) {
      let correct = choice === entries[index].classification
      if (correct) {
        this.setState({ correctAnswer: choice })
      } else {
        this.setState({ incorrectAnswer: choice })
      }
    }
  }

  getButtons() {
    const { choices, entries, answers, index, submitted } = this.props.current
    const entry = entries[index]
    const size = Object.keys(entries).length

    const start = index === 0
    const end = !(index < size - 1)
    const mediumScreen = document.body.clientWidth > this.context.measurements.mediumScreen

    let choiceButtons = []
    const palette = this.context.muiTheme.baseTheme.palette
    for (let choice of choices) {
      let correct = choice === entries[index].classification
      let handler = correct ? this.handleSuccess : this.handleFailure
      let disabledColor = correct ? palette.accent2Color : palette.accent3Color
      choiceButtons.push(
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

    let cardActions = null

    if (!this.state.small) {
      cardActions = <CardActions>
        <IconButton disabled={start} style={{verticalAlign: "middle"}} onTouchTap={this.props.prev}><ChevronLeft/></IconButton>
        {choiceButtons}
        <IconButton disabled={end && !submitted} style={{verticalAlign: "middle"}} onTouchTap={this.props.next}><ChevronRight/></IconButton>
        <FlatButton label="Quizzes" onTouchTap={this.props.removeCurrent} />
        {this.state.answered ? <FlatButton label="More Info" onTouchTap={this.toggleMoreInfo} /> : <div></div>}
      </CardActions>
    } else {
      cardActions = <CardActions>
        {choiceButtons}
        <br/>
        <IconButton disabled={start} style={{verticalAlign: "middle"}} onTouchTap={this.props.prev}><ChevronLeft/></IconButton>
        <IconButton disabled={end && !submitted} style={{verticalAlign: "middle"}} onTouchTap={this.props.next}><ChevronRight/></IconButton>
        <FlatButton label="Quizzes" onTouchTap={this.props.removeCurrent} />
        {this.state.answered ? <FlatButton label="More Info" onTouchTap={this.toggleMoreInfo} /> : <div></div>}
      </CardActions>
    }

    return cardActions
  }

  handleResize = (e) => {
    const large = document.body.clientWidth > this.context.measurements.largeScreen
    const medium = document.body.clientWidth > this.context.measurements.mediumScreen
    const small = document.body.clientWidth < this.context.measurements.smallScreen

    this.setState({
      small: small,
      medium: medium,
      large: large,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleSuccess = () => {
    let notices = ['lol', 'omg', 'wow', 'nice', 'yayy']
    this.props.submitAnswer(this.state.correctAnswer)

    this.setState({
      message: 'Correct Answer!',
      notice: notices[Math.floor(Math.random() * notices.length)],
      answered: true,
      correct: true,
      snackbarOpen: true,
    })

    this.handleCompletion(true)
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

    this.handleCompletion(false)
  }

  handleCompletion = (correct) => {
    const { answers, id, score, entries } = this.props.current
    const newScore = correct ? score + 1 : score
    if (Object.keys(answers).length >= entries.length - 1) {
      // push completed score to firebase here because cannot do so in action / reducer
      this.props.firebaseRef.child('scores').child(id).child(newScore).push(this.props.name)
      this.props.submitResponse()
    }
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

  getStyles() {
    const { index, entries, type } = this.props.current
    const entry = entries[index]

    const styles = {
      card: {
        maxWidth: 700,
        margin: "auto",
      },
      media: {
        minHeight: document.body.clientHeight > 400 ? 400 : 200,
        maxWidth: 700,
        backgroundColor: Colors.grey800,
      },
    }

    if (type !== 'text' || this.state.answered) {
      styles.media = {
        ...styles.media,
        background: `url(${entry.image}) center`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }
    }

    return styles
  }

  getCardImage() {
    const { index, entries, type } = this.props.current
    const entry = entries[index]
    const styles = this.getStyles()

    let cardImage = <CardMedia style={styles.media} overlay={<CardTitle title={entry.name} />} />

    if (type === 'image' && !this.state.answered) {
      cardImage = <CardMedia style={styles.media} />
    }

    return cardImage
  }

  toggleMoreInfo = () => {
    this.setState({ moreInfo: !this.state.moreInfo })
  }

  render() {
    const { index, entries, answers, type } = this.props.current
    const { correctAnswer, incorrectAnswer } = this.state
    const entry = entries[index]
    const pCorrect = entry.responses > 0 ? Math.round(entry.correct / entry.responses * 100) : 0
    const pIncorrect = pCorrect > 0 ? 100 - pCorrect : 0

    const styles = this.getStyles()

    const standardActions = (
      <FlatButton
        label="Okey"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.toggleMoreInfo}
      />
    )

    // turn into multiple components
    return (
      <div className="quiz">
        <Card style={styles.card}>
          {this.getCardImage()}
          {this.getButtons()}
        </Card>
        <Dialog
          title={entry.name}
          actions={standardActions}
          open={this.state.moreInfo}
          onRequestClose={this.toggleMoreInfo}
        >
          {entry.description}{' '}
          {pCorrect}% answered {' '}{correctAnswer} and {' '}
          {pIncorrect}% answered {' '}{incorrectAnswer}.
        </Dialog>
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
