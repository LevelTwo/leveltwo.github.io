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
  const { index, entries, submitted, score, quizId } = state.current


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
      const id = action.quizId
      // if in history then use cached version
      if (id in state.history) {
        return {
          ...state,
          current: state.history[id],
        }
      }
      let quiz = state.quizzes[id]
      quiz = {
        ...quiz,
        quizId: id,
        score: 0,
        index: 0,
        submitted: false,
        entries: quiz.entries.map((k) => state.entries[k]),
        answers: {},
      }
      return {
        ...state,
        current: quiz,
        history: {
          ...history,
          [id]: quiz,
        },
      }
    case types.NEXT:
      let nextIndex = index < Object.keys(entries).length && !submitted ? index + 1 : index
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
    case types.REQUEST_QUIZZES:
      // let ref = new Firebase(firebaseUrl + '/quizzes')
      // let quizzes = new Promise((resolve, reject) => {
      //   let values = ref.once('value', snapshot => snapshot.val())
      //   resolve(values)
      // })
      // console.log(quizzes)
      // return {
      //   ...state,
      //   quizzes: {
      //     quizzes,
      //   },
      // }
    case types.REQUEST_QUIZ_INFO:
    case types.SUBMIT_ANSWER:
      const answerRecord = action.answer
      const entryId = action.entryId
      const newScore = answerRecord === entries[index].answer ? score + 1 : score
      const newCurrent = {
        ...state.current,
        score: newScore,
        answers: {
          ...state.current.answers,
          [entryId]: answerRecord,
        },
      }
      return {
        ...state,
        current: newCurrent,
        history: {
          ...state.history,
          [quizId]: newCurrent,
        },
      }
    case types.SUBMIT_RESPONSE:
      // let ref = new Firebase(firebaseUrl + 'scores')
      // ref.child('scores').child('tc2').child(1).once('value', function(snapshot) { return snapshot.numChildren()); })
      // ref.child('scores').child('tc2').child('1').child('2').set('Anon')
    case types.REQUEST_RESPONSES:
      return state;

    case 'ADD_FRIEND':
      const newId = state.friends[state.friends.length-1] + 1;
      return {
        ...state,
        friends: state.friends.concat(newId),
        friendsById: {
          ...state.friendsById,
          [newId]: {
            id: newId,
            name: action.name,
          },
        },
      }

    case 'DELETE_FRIEND':
      return {
        ...state,
        friends: state.friends.filter(id => id !== action.id),
        friendsById: omit(state.friendsById, action.id),
      }

    case 'STAR_FRIEND':
      return {
        ...state,
        friendsById: mapValues(state.friendsById, (friend) => {
          return friend.id === action.id ?
            assign({}, friend, { starred: !friend.starred }) :
            friend
        }),
      }

    case 'COMPLETE_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, action.index),
          Object.assign({}, state.todos[action.index], {
            completed: true,
          }),
          ...state.todos.slice(action.index + 1),
        ],
      })

    default:
      return state;
  }
}
