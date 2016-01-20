import React, { Component } from 'react';
import { LeftNav, Mixins, Styles } from 'material-ui';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';

const {Colors, Spacing, Typography} = Styles;
const {StylePropable} = Mixins;
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

export default class AppLeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftNavOpen: false,
    };
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
    this.setState({
      leftNavOpen: open,
    });
  }

  handleRequestChangeList = (event, value) => {
    this.props.history.push(value);
    this.setState({
      leftNavOpen: false,
    });
  }

  handleRequestChangeLink = (event, value) => {
    window.location = value;
    this.setState({
      leftNavOpen: false,
    });
  }

  handleTouchTapHeader = () => {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
    });
  }

  toggle = () => {
    this.setState({ leftNavOpen: !this.state.leftNavOpen });
  }

  render() {
    return (
      <LeftNav
        zIndex={0}
        docked={false}
        open={this.state.leftNavOpen}
        zDepth={0}
        onRequestChange={this.handleChangeRequestLeftNav}
        style={this.props.style}
      >
        <div
          style={styles}
          onTouchTap={this.handleTouchTapHeader}
        >
          Quizzes
        </div>
        <SelectableList
          valueLink={{
            value: this.getSelectedIndex(),
            requestChange: this.handleRequestChangeList,
          }}
        >
          <ListItem
            value="profile"
            primaryText="Profile"
          />
          <ListItem
            value="about"
            primaryText="About"
          />
          <ListItem
            value="app"
            primaryText="Quizzes"
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
            value="https://github.com/callemall/material-ui"
            primaryText="Footballer or Mathematician I"
          />
          <ListItem
            value="http://facebook.github.io/react"
            primaryText="Footballer or Mathematician II"
          />
          <ListItem
            value="https://www.google.com/design/spec/material-design/introduction.html"
            primaryText="Thai or Chinese I"
          />
          <ListItem
            value="https://www.google.com/design/spec/material-design/introduction.html"
            primaryText="Thai or Chinese II"
          />
        </SelectableList>
      </LeftNav>
    );
  }
}
