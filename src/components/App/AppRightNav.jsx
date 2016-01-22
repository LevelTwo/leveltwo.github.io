import React, { Component } from 'react'
import { LeftNav, Mixins, Styles } from 'material-ui'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance'
import CheckIcon from 'material-ui/lib/svg-icons/navigation/check'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

import CorrectListItem from './CorrectListItem'
import IncorrectListItem from './IncorrectListItem'

const { Colors, Spacing, Typography } = Styles
const { StylePropable } = Mixins
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
    docked: React.PropTypes.bool,
    history: React.PropTypes.object,
    location: React.PropTypes.object,
    onRequestChangeLeftNav: React.PropTypes.func,
    onRequestChangeList: React.PropTypes.func,
    open: React.PropTypes.bool,
    style: React.PropTypes.object,
  }

  getSelectedIndex = () => {
    return this.props.location.pathname.split('/')[1]
  }

  getQuestionList = () => {
    const { current } = this.props
    let questions = []

    for (let i = 0; i < Object.keys(current.entries).length; i++) {
      let entry = current.entries[i]

      if (entry.id in current.answers) {
        if (current.answers[entry.id] === entry.classification) {
          questions.push(<ListItem key={entry.name} primaryText={<CorrectListItem primaryText={entry.name} style={{maxHeight: 48}} />} />)
        } else {
          questions.push(<ListItem key={entry.name} primaryText={<IncorrectListItem primaryText={entry.name} style={{maxHeight: 48}} />} />)
        }
      } else {
        questions.push(<ListItem key={entry.name} primaryText={entry.name} />)
      }
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
        <SelectableList
          subheader={subheader}
          valueLink={{
            value: '',
            requestChange: this.handleRequestChangeLink,
          }}
        >
          {questions}
        </SelectableList>
      </LeftNav>
    )
  }
}
