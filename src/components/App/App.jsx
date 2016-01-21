/*--------------------------------*\
  Change title to QbY in the future
\*--------------------------------*/

import React, { PropTypes } from 'react'
import AppBar from 'material-ui/lib/app-bar'
import AppCanvas from 'material-ui/lib/app-canvas'
import LeftNav from 'material-ui/lib/left-nav'
import RaisedButton from 'material-ui/lib/raised-button'
import Theme from '../../theme'
import { Colors, ThemeManager, Spacing, Typography } from 'material-ui/lib/styles'
import FlatButton from 'material-ui/lib/flat-button'
import Paper from 'material-ui/lib/paper'
import { Tab, Tabs } from 'material-ui/lib/tabs'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'
import EnhancedButton from 'material-ui/lib/enhanced-button'
import FontIcon from 'material-ui/lib/font-icon'
import PollIcon from 'material-ui/lib/svg-icons/social/poll'
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu'
import AdjustIcon from 'material-ui/lib/svg-icons/image/adjust'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/actionCreators'

import AppLeftNav from './AppLeftNav'
import AppRightNav from './AppRightNav'
import Quiz from '../Quizzes/Quiz';

const measurements = {
  appBarHeight: 64,
  smallScreen: 600,
  mediumScreen: 992,
  largeScreen: 1200,
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      muiTheme: ThemeManager.getMuiTheme(Theme),
      renderTabs: !(document.body.clientWidth < measurements.mediumScreen),
      leftNavOpen: false,
      rightNavOpen: false,
    }
    window.onresize = this.setTabState
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

  componentWillMount() {
    const { dispatch } = this.props
    const boundActionCreators = bindActionCreators(actionCreators, dispatch)

    const firebaseUrl = 'https://leveltwo.firebaseio.com'
    const ref = new Firebase(firebaseUrl)
    boundActionCreators.importFirebase(ref)
    boundActionCreators.listenToScoreChanges()
  }

  getStyles() {
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
        left: 0,
      },
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
    }

    return styles
  }

  toggleLeftNav = () => {
    this.refs.leftNav.toggle()
  }

  toggleRightNav = () => {
    this.refs.rightNav.toggle()
  }

  render() {
    const { dispatch } = this.props
    const boundActionCreators = bindActionCreators(actionCreators, dispatch)

    const styles = this.getStyles()

    let userAvatar = <Avatar style={{marginTop: '12'}}>A</Avatar>

    const title = (
      <div>
        <Avatar src={this.props.avatar} style={{top: 12, position: "relative", marginRight: 12}} />
        <span style={{marginRight: 12}}>{this.props.name}</span>
        <span style={{position: "absolute", right: 70}}>{this.props.score} pts</span>
      </div>
    )

    // FIX NAVBAR
    return (
      <div>
        <AppBar
          iconElementRight={<IconButton onTouchTap={this.toggleRightNav}><AdjustIcon /></IconButton>}
          onLeftIconButtonTouchTap={this.toggleLeftNav}
          title={title}
          showMenuIconButton={true}
          open={this.state.rightNavOpen}
          zDepth={1}
          style={styles.appBar}
        />
        <AppLeftNav
          ref="leftNav"
          {...boundActionCreators}
          {...this.props}
        />
        <AppRightNav
          ref="rightNav"
          {...boundActionCreators}
          {...this.props}
        />
        <div style={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    name: state.name,
    avatar: state.avatar,
    score: state.current.score || 0,
  }
}

export default connect(select)(App)
