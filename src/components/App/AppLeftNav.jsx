import React, { Component } from 'react'
import Avatar from 'material-ui/lib/avatar'
import LeftNav from 'material-ui/lib/left-nav'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'
import { Colors, Spacing, Typography } from 'material-ui/lib/styles'

import AccountBoxIcon from 'material-ui/lib/svg-icons/action/account-box'
import AccountCircleIcon from 'material-ui/lib/svg-icons/action/account-circle'
import InfoIcon from 'material-ui/lib/svg-icons/action/info'
import InfoOutlineIcon from 'material-ui/lib/svg-icons/action/info-outline'

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

export default class AppLeftNav extends Component {

  constructor(props) {
    super(props)
    this.state = { leftNavOpen: false }
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

  handleChangeRequestLeftNav = (open) => {
    this.setState({ leftNavOpen: open })
  }

  handleRequestChangeList = (event, value) => {
    this.props.history.push(value)
    this.setState({ leftNavOpen: false })
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value
    this.setState({ leftNavOpen: false })
  }

  handleTouchTapHeader = () => {
    this.props.history.push('/')
    this.setState({ leftNavOpen: false })
  }

  toggle = () => {
    this.setState({ leftNavOpen: !this.state.leftNavOpen })
  }

  render() {
    const quizzes = this.props.quizzes
    const quizArray = Object.keys(quizzes).map(key => quizzes[key])
    const listElements = quizArray.map(quiz => <ListItem
        leftAvatar={<Avatar src={quiz.img} backgroundColor={quiz.background} />}
        primaryText={quiz.title}
      />
    )

    return (
      <LeftNav
        zIndex={0}
        docked={this.props.docked}
        open={this.props.open}
        onRequestChange={this.props.onRequestChange}
        style={this.props.style}
      >
        <div
          style={styles}
          onTouchTap={this.handleTouchTapHeader}
        >
          {this.props.name}
        </div>
        <SelectableList
          valueLink={{
            value: this.getSelectedIndex(),
            requestChange: this.handleRequestChangeList,
          }}
        >
          <ListItem
            leftAvatar={<Avatar icon={<AccountCircleIcon />} backgroundColor={Colors.blue500} />}
            value="profile"
            primaryText="Profile"
          />
          <ListItem
            leftAvatar={<Avatar icon={<InfoIcon />} backgroundColor={Colors.red500} />}
            value="about"
            primaryText="About"
          />
          <ListItem
            leftAvatar={<Avatar src="images/quizzes/quizzes2.svg" />}
            value="app"
            primaryText="Quizzes"
            nestedItems={listElements}
          />
        </SelectableList>
        <Divider />
        <SelectableList
          subheader="Resources"
          valueLink={{
            value: '',
            requestChange: this.handleRequestChangeLink,
          }}
        >
          <ListItem
            value="https://github.com/leveltwo/leveltwo.github.io"
            primaryText="Source"
          />
          <ListItem
            value="http://facebook.github.io/react"
            primaryText="React"
          />
          <ListItem
            value="https://www.google.com/design/spec/material-design/introduction.html"
            primaryText="Material Design"
          />
          <ListItem
            value="https://github.com/callemall/material-ui"
            primaryText="material-ui"
          />
        </SelectableList>
      </LeftNav>
    )
  }
}
