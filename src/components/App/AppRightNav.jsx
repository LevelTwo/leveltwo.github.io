import React, { Component } from 'react';
import { LeftNav, Mixins, Styles } from 'material-ui';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import CheckIcon from 'material-ui/lib/svg-icons/navigation/check'
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close'

import CorrectListItem from './CorrectListItem'
import IncorrectListItem from './IncorrectListItem'

const { Colors, Spacing, Typography } = Styles;
const { StylePropable } = Mixins;
const SelectableList = SelectableContainerEnhance(List);


const styles = {
  cursor: 'pointer',
  fontSize: 24,
  color: Typography.textFullWhite,
  lineHeight: Spacing.desktopKeylineIncrement + 'px',
  fontWeight: Typography.fontWeightLight,
  backgroundColor: Colors.green500,
  paddingLeft: Spacing.desktopGutter,
  marginBottom: 8,
};

export default class AppRightNav extends Component {

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
    return this.props.location.pathname.split('/')[1];
  }

  handleChangeRequestLeftNav = (open) => {
    this.setState({ leftNavOpen: open })
  }

  handleRequestChangeList = (event, value) => {
    this.props.history.push(value);
    this.setState({ leftNavOpen: false })
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value;
    this.setState({ leftNavOpen: false })
  }

  handleTouchTapHeader = () => {
    this.props.history.push('/');
    this.setState({ leftNavOpen: false })
  }

  toggle = () => {
    this.setState({ leftNavOpen: !this.state.leftNavOpen })
  }

  render() {
    let listItem = <CorrectListItem label="Q1" />
    let listItem2 = <IncorrectListItem label="Q2" />
    return (
      <LeftNav
        zIndex={0}
        openRight={true}
        docked={true || false}
        open={true || this.state.leftNavOpen}
        zDepth={0}
        onRequestChange={this.handleChangeRequestLeftNav}
        style={this.props.style}
      >
        <div
          style={styles}
          onTouchTap={this.handleTouchTapHeader}
        >
          0 pts
        </div>
        <SelectableList
          subheader="No Active Quiz"
          valueLink={{
            value: '',
            requestChange: this.handleRequestChangeLink,
          }}
        >
          <ListItem
            value="https://github.com/leveltwo/leveltwo.github.io"
            primaryText={listItem}
          />
          <ListItem
            value="https://github.com/callemall/material-ui"
            primaryText={listItem2}
          />
          <ListItem
            value="http://facebook.github.io/react"
            primaryText="Q3"
          />
          <ListItem
            value="https://www.google.com/design/spec/material-design/introduction.html"
            primaryText="Q4"
          />
          <ListItem
            value="https://www.google.com/design/spec/material-design/introduction.html"
            primaryText="Q5"
          />
        <ListItem
          primaryText="Results"
        />
        </SelectableList>
      </LeftNav>
    );
  }
}
