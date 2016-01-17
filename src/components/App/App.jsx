/*--------------------------------*\
  Change title to QbY in the future
\*--------------------------------*/

import React, { PropTypes } from 'react'
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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/actionCreators'

import AppNavBar from './AppNavBar'
import Quiz from '../Quizzes/Quiz';

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
    left: 56,
    top: 22,
    position: 'absolute',
    fontSize: 26,
  },
  svgLogo: {
    width: measurements.appBarHeight * 4 / 5,
    height: measurements.appBarHeight * 4 / 5,
    position: 'absolute',
    top: 6,
  },
  svgLogoContainer: {
    position: 'fixed',
    width: 300,
    left: Spacing.desktopGutter * 2,
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


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      muiTheme: ThemeManager.getMuiTheme(Theme),
      renderTabs: !(document.body.clientWidth < measurements.mediumScreen),
    };
    window.onresize = this.setTabState;
  }

  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    location: PropTypes.object,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  onLeftIconButtonTouchTap = () => {
    this.refs.leftNav.toggle();
  }


  render() {
    let { dispatch } = this.props
    let boundActionCreators = bindActionCreators(actionCreators, dispatch)

    const firebaseUrl = 'https://leveltwo.firebaseio.com'
    const ref = new Firebase(firebaseUrl)
    boundActionCreators.importFirebase(ref)
    boundActionCreators.listenToScoreChanges()


    // FIX NAVBAR
    return (
      <div>
        <AppLeftNav
          ref="leftNav"
          history={this.props.history}
          location={this.props.location}
          {...boundActionCreators}
        />
      <div>
          <AppNavBar {...this.props} />
          <div style={styles.container}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    name: state.name,
    avatar: state.avatar,
  }
}

export default connect(select)(App)
