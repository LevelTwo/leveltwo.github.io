import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/actionCreators'

import QuizRender from './QuizRender'
import QuizGrid from './QuizGrid'

class Quiz extends Component {
  render() {
    let { dispatch, quizzes } = this.props
    let boundActionCreators = bindActionCreators(actionCreators, dispatch)
    if (Object.keys(this.props.current).length) {
    // if (0) {
      return <QuizRender {...boundActionCreators} />
    }
    return <QuizGrid {...boundActionCreators} quizzes={quizzes} />
  }
}

function select(state) {
  return {
    current: state.current,
    quizzes: state.quizzes,
  }
}

export default connect(select)(Quiz)
