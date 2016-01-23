import React, { PropTypes, Component } from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import { Colors, Spacing, Typography } from 'material-ui/lib/styles'
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'

import CheckIcon from 'material-ui/lib/svg-icons/navigation/check'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

import CorrectListItem from './CorrectListItem'
import IncorrectListItem from './IncorrectListItem'

const SelectableList = SelectableContainerEnhance(List)


const styles = {
  cursor: 'pointer',
  fontSize: 24,
  color: Typography.textFullWhite,
  lineHeight: Spacing.desktopKeylineIncrement + 'px',
  fontWeight: Typography.fontWeightLight,
  backgroundColor: Colors.green500,
  paddingLeft: Spacing.desktopGutter,
  marginBottom: 8,
}

export default class AppRightNav extends Component {

  constructor(props) {
    super(props)
    this.state = { rightNavOpen: false }
  }

  static propTypes = {
    docked: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    onRequestChangeLeftNav: PropTypes.func,
    onRequestChangeList: PropTypes.func,
    open: PropTypes.bool,
    style: PropTypes.object,
  }

  getSelectedIndex = () => {
    return this.props.location.pathname.split('/')[1]
  }

  getQuestionList = () => {
    const { current, selectQuestion } = this.props
    let questions = []

    for (let i = 0; i < Object.keys(current.entries).length; i++) {
      let entry = current.entries[i]
      const questionName = `Q${i+1}`
      const handleSelectQuestion = () => selectQuestion(i)
      let listItem = <ListItem
        key={entry.name}
        primaryText={questionName}
        onTouchTap={handleSelectQuestion}
      />
      if (entry.id in current.answers) {
        if (current.answers[entry.id] === entry.classification) {
          listItem = <CorrectListItem
            key={entry.name}
            index={i}
            onTouchTap={handleSelectQuestion}
          />
        } else {
          listItem = <IncorrectListItem
            key={entry.name}
            index={i}
            onTouchTap={handleSelectQuestion}
          />
        }
      }
      questions.push(listItem)
    }

    return questions
  }

  handleChangeRequestLeftNav = (open) => {
    this.setState({ rightNavOpen: open })
  }

  handleRequestChangeList = (event, value) => {
    this.props.history.push(value)
    this.setState({ rightNavOpen: false })
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value
    this.setState({ rightNavOpen: false })
  }

  handleTouchTapHeader = () => {
    this.props.history.push('/')
    this.setState({ rightNavOpen: false })
  }

  toggle = () => {
    this.setState({ rightNavOpen: !this.state.rightNavOpen })
  }

  render() {
    const { current } = this.props
    const hasCurrent = Object.keys(current).length > 0
    const subheader = hasCurrent ? 'Questions' : 'No Active Quiz'
    const questions = hasCurrent ? this.getQuestionList() : ''
    return (
      <LeftNav
        zIndex={0}
        openRight={true}
        docked={this.props.docked}
        open={this.props.open}
        zDepth={0}
        onRequestChange={this.props.onRequestChange}
        style={this.props.style}
      >
        <div
          style={styles}
          onTouchTap={this.handleTouchTapHeader}
        >
          {hasCurrent ? current.score : 0} pts
        </div>
        <List subheader={subheader}>
          {questions}
        </List>
      </LeftNav>
    )
  }
}
