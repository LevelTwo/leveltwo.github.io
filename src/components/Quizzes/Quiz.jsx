import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/actionCreators'

import QuizRender from './QuizRender'
import QuizGrid from './QuizGrid'

class Quiz extends Component {
  render() {
    let { dispatch, current, quizzes, scores, firebaseRef, name } = this.props
    let boundActionCreators = bindActionCreators(actionCreators, dispatch)
    if (Object.keys(current).length) {
      return (
        <QuizRender
          firebaseRef={firebaseRef}
          name={name}
          current={current}
          quizzes={quizzes}
          scores={scores}
          {...boundActionCreators}
        />
      )
    }
    return <QuizGrid {...boundActionCreators} quizzes={quizzes} />
  }
}

function select(state) {
  return {
    firebaseRef: state.firebaseRef,
    name: state.name,
    current: state.current,
    quizzes: state.quizzes,
    scores: state.scores,
  }
}

export default connect(select)(Quiz)
