// import * as types from '../constants/ActionTypes';
import omit from 'lodash/object/omit'
import assign from 'lodash/object/assign'
import mapValues from 'lodash/object/mapValues'
import Firebase from 'firebase'
import * as types from '../actions/actionTypes'
import { List, Map } from 'immutable'

const initialState = {
  firebaseRef: null,
  name: 'Anonymous',
  avatar: 'images/avatars/default.svg',
  current: {},
  history: {},
  entries: {},
  quizzes: {},
  scores: {},
}

export default function firebaseReducer(state = initialstate, action) {
  return state
}

export default function reducer(state = initialState, action) {
  const firebaseUrl = 'https://leveltwo.firebaseio.com'
  const { index, entries, submitted, score, id } = state.current
  const { firebaseRef } = state

  switch (action.type) {
    case types.SET_NAME:
      return {
        ...state,
        name: action.name || 'Anonymous',
      }
    case types.SET_AVATAR:
      return {
        ...state,
        avatar: action.avatar,
      }
    case types.SET_QUIZ:
      return {
        ...state,
        history: {
          ...history,
          [action.quiz.quizId]: action.quiz,
        },
      }
    case types.SET_QUIZZES:
      return {
        ...state,
        quizzes: action.quizzes,
      }
    case types.SET_FIREBASE_REF:
      return {
        ...state,
        firebaseRef: action.firebaseRef,
      }
    case types.STORE_FIREBASE:
      return {
        ...state,
        entries: action.entries,
        quizzes: action.quizzes,
        scores: action.scores,
      }
    case types.STORE_SCORES:
      return {
        ...state,
        scores: action.scores,
      }
    case types.SELECT_QUIZ:
      const quizId = action.quizId
      // if in history then use cached version
      if (quizId in state.history) {
        return {
          ...state,
          current: state.history[quizId],
        }
      }
      let quiz = state.quizzes[quizId]
      return {
        ...state,
        current: {
          ...quiz,
          quizId: quizId,
          score: 0,
          index: 0,
          submitted: false,
          entries: quiz.entries.map((k) => state.entries[k]),
          answers: {},
        },
      }
    case types.NEXT:
      let nextIndex = index + 1 //index < Object.keys(entries).length && !submitted ? index + 1 : index
      return {
        ...state,
        current: {
          ...state.current,
          index: nextIndex,
        },
      }
    case types.PREV:
      let prevIndex = index > 0 ? index - 1 : index
      return {
        ...state,
        current: {
          ...state.current,
          index: prevIndex,
        },
      }
    case types.REMOVE_CURRENT:
      return {
        ...state,
        history: {
          ...state.history,
          [id]: state.current,
        },
        current: {},
      }
    case types.SUBMIT_ANSWER:
      const entryId = entries[index]['id']
      const answerIsCorrect = action.answer === entries[index]['classification']

      // increment responses and update correct answers
      firebaseRef.child('entries').child(entryId).child('responses').transaction(k => k+1)

      if (answerIsCorrect)
        firebaseRef.child('entries').child(entryId).child('correct').transaction(k => k+1)

      // update current with new score and user response
      return {
        ...state,
        current: {
          ...state.current,
          score: answerIsCorrect ? score + 1 : score,
          answers: {
            ...state.current.answers,
            [entryId]: action.answer,
          },
        },
      }
    case types.SUBMIT_RESPONSE:
      return {
        ...state,
        current: {
          ...state.current,
          submitted: true,
        },
      }
    default:
      return state;
  }
}
