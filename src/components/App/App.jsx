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

import LinearProgress from 'material-ui/lib/linear-progress'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/actionCreators'

import AppLeftNav from './AppLeftNav'
import AppRightNav from './AppRightNav'
import Quiz from '../Quizzes/Quiz';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      leftNavDocked: false,
      leftNavOpen: false,
      rightNavDocked: false,
      rightNavOpen: false,
      muiTheme: ThemeManager.getMuiTheme(Theme),
      measurements: {
        smallScreen: 600,
        mediumScreen: 992,
        largeScreen: 1200,
        rightNavOpen: 1000,
        leftNavOpen: 992,
      },
      iconElementRight: <IconButton onTouchTap={this.toggleRightNav}><AdjustIcon /></IconButton>,
      showMenuIconButton: true,
      windowWidth: window.innerWidth,
    }
  }

  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    location: PropTypes.object,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object,
    measurements: PropTypes.object,
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      measurements: this.state.measurements,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const boundActionCreators = bindActionCreators(actionCreators, dispatch)

    const firebaseUrl = 'https://leveltwo.firebaseio.com'
    const ref = new Firebase(firebaseUrl)
    boundActionCreators.importFirebase(ref)
    boundActionCreators.listenToScoreChanges()
    this.handleResize()
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth })
    const large = document.body.clientWidth > this.state.measurements.largeScreen
    const medium = document.body.clientWidth > this.state.measurements.mediumScreen

    this.setState({
      showMenuIconButton: medium ? false : true,
      leftNavDocked: medium ? true : false,
      leftNavOpen: medium ? true : false,
      rightNavDocked: large ? true : false,
      rightNavOpen: large ? true : false,
      iconElementRight: large ? <div></div> : <IconButton onTouchTap={this.toggleRightNav}><AdjustIcon /></IconButton>,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  getStyles() {
    const { measurements } = this.state

    const styles = {
      appBar: {
        position: 'fixed',
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0,
        left: 0,
      },
      avatar: {
        top: 12,
        position: 'relative',
        marginRight: 12,
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
      name: {
        marginRight: 12,
      },
      root: {
        backgroundColor: Theme.palette.primary1Color,
        position: 'fixed',
        height: 64,
        top: 0,
        right: 0,
        zIndex: 1101,
        width: '100%',
      },
      score: {
        position: 'absolute',
        right: 70,
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
        width: 64 * 4 / 5,
        height: 64 * 4 / 5,
        position: 'absolute',
        top: 6,
      },
      svgLogoContainer: {
        position: 'fixed',
        width: 300,
        left: Spacing.desktopGutter * 2,
      },
      button: {
        backgroundColor: 'transparent',
        color: 'white',
      },
    }

    if (document.body.clientWidth > measurements.mediumScreen) {
      styles.leftNav = {
        zIndex: styles.appBar.zIndex - 1,
      }

      styles.root.paddingLeft = 256
      styles.container.paddingLeft = 256
    }

    if (document.body.clientWidth > measurements.largeScreen) {
      styles.rightNav = {
        zIndex: styles.appBar.zIndex - 1,
      }

      styles.root.paddingRight = 256
      styles.container.paddingRight = 256
      styles.score.right = 32
    }

    return styles
  }

  toggleLeftNav = () => {
    this.setState({ leftNavOpen: !this.state.leftNavOpen })
  }

  toggleRightNav = () => {
    this.setState({ rightNavOpen: !this.state.rightNavOpen })
  }

  render() {
    const { dispatch } = this.props
    const score = this.props.current.score || 0
    const answers = this.props.current.answers ? Object.keys(this.props.current.answers).length : 0
    const total = this.props.current.entries ? this.props.current.entries.length : 0
    const boundActionCreators = bindActionCreators(actionCreators, dispatch)

    const styles = this.getStyles()

    const title = (
      <div>
        <Avatar src={this.props.avatar} style={styles.avatar} />
        <span style={styles.name}>{this.props.name}</span>
        <span style={styles.score}>{score} pts</span>
      </div>
    )

    return (
      <div>
        <AppBar
          iconElementRight={this.state.iconElementRight}
          onLeftIconButtonTouchTap={this.toggleLeftNav}
          title={title}
          showMenuIconButton={this.state.showMenuIconButton}
          zDepth={2}
          style={styles.appBar}
        />
        <AppLeftNav
          ref="leftNav"
          open={this.state.leftNavOpen}
          docked={this.state.leftNavDocked}
          style={styles.leftNav}
          onRequestChange={this.toggleLeftNav}
          {...this.props}
          {...boundActionCreators}
        />
        <AppRightNav
          ref="rightNav"
          open={this.state.rightNavOpen}
          docked={this.state.rightNavDocked}
          style={styles.rightNav}
          onRequestChange={this.toggleRightNav}
          {...this.props}
          {...boundActionCreators}
        />
        <LinearProgress
          color={total ? Colors.green300 : Colors.green500}
          mode="determinate"
          value={total ? answers * 100 / total : 100}
          style={{top: 60, zIndex: 1102, position: "fixed", width: "98.5%"}}
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
    current: state.current,
    quizzes: state.quizzes,
  }
}

export default connect(select)(App)
