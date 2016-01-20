import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { VelocityTransitionGroup } from 'velocity-react'
import { List, Map, OrderedMap  } from 'immutable'
import { connect } from 'react-redux'

import QuizCard from './QuizCard'
import Results from './Results'

class QuizRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: 0,
      correct: 0,
    }
  }

  static propTypes =  {
    names: PropTypes.array,
    type: PropTypes.string,
    choices: PropTypes.array,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }


  componentDidMount() {
    document.onkeyup = (event) => {
      if (!event)
        event = window.event
      let code = event.keyCode
      if (event.charCode && code === 0)
        code = event.charCode
      switch(code) {
        case 37:
          this.props.prev()
          // Key left.
          break
        case 39:
          this.props.next()
          // Key right.
          break
      }
      event.preventDefault()
    }
  }

  componentWillUnmount() {
    document.onkeyup = null
  }

  getCard() {
    const { entries, index, answers, choices, id, score, title } = this.props.current
    const scores = this.props.scores[id]
    const size = Object.keys(entries).length
    if (Object.keys(entries).length === index) {
      return (
        <Results {...this.props} />
      )
    }

    const entry = entries[index]
    return (
      <QuizCard key={entry.id} {...this.props} />
    )
  }

  getGrid() {
    return <QuizGrid />;
  }

  getStyles() {
    const styles = {
      transition: { position: 'relative' },

      // taken from https://github.com/twitter-fabric/velocity-react/blob/master/demo/components/loading-crossfade-component.jsx
      enter: {
        animation: { opacity: 1 },
        duration: 500,
        style: {
          opacity: 0,
          position: 'relative',
          top: '',
          left: '',
          bottom: '',
          right: '',
          zIndex: '',
        },
      },
      leave: {
        animation: { opacity: 0 },
        duration: 500,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
        },
      },
    }

    return styles
  }

  render() {
    const styles = this.getStyles()
    // let rend = this.getCard()
    // let rend = <Results score={this.state.correct} />
    // let rend = answered === names.length ? this.getCard() : <Results score={this.state.correct} />
    return (
      <VelocityTransitionGroup
        style={styles.transition}
        enter={styles.enter}
        leave={styles.leave}
      >
        {this.getCard()}
      </VelocityTransitionGroup>
    )
  }
}

export default QuizRender
