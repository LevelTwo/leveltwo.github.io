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
      correctAnswer: '',
      incorrectAnswer: '',
    }
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
    answered: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
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
    this.setState({
      answered: this.props.answered,
    })
    for (let choice of this.props.choices) {
      let correct = choice === this.props.answer
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
    let list = []
    const palette = this.context.muiTheme.baseTheme.palette
    for (let choice of this.props.choices) {
      let correct = choice === this.props.answer
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
    this.props.submitAnswer(this.props.answerId, this.state.correctAnswer)

    this.setState({
      message: 'Correct Answer!',
      notice: notices[Math.floor(Math.random() * notices.length)],
      answered: true,
      snackbarOpen: true,
    })
  }

  handleFailure = () => {
    let notices = ['lol', 'omg', 'ohno', 'oops', 'nooo']
    this.props.submitAnswer(this.props.answerId, this.state.incorrectAnswer)

    this.setState({
      message: 'Incorrect Answer!',
      notice: notices[Math.floor(Math.random() * notices.length)],
      answered: true,
      snackbarOpen: true,
    })
  }

  getDescription() {
    let text = <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    return
  }

  getTitle() {
    let menuItems = []
    const { size, index } = this.props
    for (let i = 0; i < size; i++) {
      menuItems.push(
        <MenuItem key={`Q${i}`} value={i} label={i+1} primaryText={`Q${i}`} />
      )
    }
    menuItems.push(<MenuItem key="Results" value={size+1} label="Results" primaryText="Results" />)
    return (
      <span>
        <span>{this.props.name}</span>
        <DropDownMenu labelStyle={{paddingRight: 36}} underlineStyle={{opacity: 0}} style={{position: "absolute", top: 6, right: 0}} value={index}>
          {menuItems}
        </DropDownMenu>
      </span>
    )
  }

  render() {
    const styles = {
      card: {
        maxWidth: 700,
        margin: "auto",
      },
      media: {
        minHeight: 350,
        maxWidth: 700,
        background: `url(${this.props.img}) center`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
    }
    const { index, size, prev, next, submitAnswer } = this.props
    const start = index === 0
    const end = !(index < size - 1 || this.state.answered)

    return (
      <div className="quiz">
        <Card style={styles.card}>
          <CardTitle title={this.getTitle()} />
          <CardMedia style={styles.media}>
          </CardMedia>
          <CardActions>
            {this.getButtons()}
          </CardActions>
          <CardActions>
            <IconButton disabled={start} style={{verticalAlign: "middle"}} onTouchTap={prev}><ChevronLeft/></IconButton>
            <IconButton disabled={end} style={{verticalAlign: "middle"}} onTouchTap={next}><ChevronRight/></IconButton>
            <FlatButton label="More Info" labelStyle={{padding: "0 0 0 16px"}}>
              <ArrowDropDown style={{verticalAlign: "middle"}} />
            </FlatButton>
          </CardActions>
          {this.getDescription()}
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
