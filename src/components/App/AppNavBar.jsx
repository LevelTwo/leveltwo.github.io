import React, { PropTypes, Component } from 'react'
import AppBar from 'material-ui/lib/app-bar'
import AppCanvas from 'material-ui/lib/app-canvas'
import RaisedButton from 'material-ui/lib/raised-button'
import Theme from '../../theme'
import { Colors, ThemeManager, Spacing, Typography } from 'material-ui/lib/styles'
import FlatButton from 'material-ui/lib/flat-button'
import Paper from 'material-ui/lib/paper'
import { Tab, Tabs } from 'material-ui/lib/tabs'
import AppLeftNav from './AppLeftNav'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'
import EnhancedButton from 'material-ui/lib/enhanced-button'
import FontIcon from 'material-ui/lib/font-icon'
import PollIcon from 'material-ui/lib/svg-icons/social/poll'
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu'

const measurements = {
  appBarHeight: 64,
  smallScreen: 600,
  mediumScreen: 992,
  largeScreen: 1200,
}

const styles = {
  container: {
    paddingTop: 64,
    paddingBottom: 10,
  },
  iconButton: {
    position: 'fixed',
    right: Spacing.desktopGutter,
    top: 8,
    zIndex: 5,
    color: 'white',
  },
  root: {
    backgroundColor: Theme.palette.primary1Color,
    position: 'fixed',
    height: measurements.appBarHeight,
    top: 0,
    right: 0,
    zIndex: 1101,
    width: '100%',
  },
  span: {
    color: Colors.white,
    fontWeight: Typography.fontWeightLight,
    left: Spacing.desktopGutter * 2.5,
    top: 22,
    position: 'absolute',
    fontSize: 26,
  },
  svgLogo: {
    width: measurements.appBarHeight * 4 / 5,
    height: measurements.appBarHeight * 4 / 5,
    position: 'absolute',
    borderRadius: '50%',
    top: 6,
  },
  svgLogoContainer: {
    position: 'fixed',
    width: 300,
    left: Spacing.desktopGutter,
  },
  tabs: {
    width: 425,
    bottom: 0,
    position: 'absolute',
    right: Spacing.desktopGutter,
    bottom: 0,
  },
  tab: {
    height: measurements.appBarHeight,
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
  },
};

const quizNames = [
  "wayne-rooney",
  "daniel-sturridge",
  "romelu-lukaku",
  "jamie-vardy",
  "harry-kane",
  "odion-ighalo",
  "riyad-mahrez",
];

class AppNavBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: true,
      muiTheme: ThemeManager.getMuiTheme(Theme),
      renderTabs: !(document.body.clientWidth < measurements.mediumScreen),
      tabIndex: this.getSelectedIndex(),
    };
    window.onresize = this.setTabState;
  }

  getSelectedIndex() {
    return this.props.history.isActive('/profile') ? '1' :
      this.props.history.isActive('/about') ? '2' : '3';
  }

  componentDidMount() {
    this.setTabState();
  }

  getAppBar() {
    let userAvatar = <Avatar style={{marginTop: '12'}}>A</Avatar>

    return (
      <AppBar
        onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
        title={this.props.name}
        zDepth={1}
        style={this.props.style}
      >
        {userAvatar}
      </AppBar>
    );
  }

  render() {
    return this.getAppBar()
  }
}

export default AppNavBar
