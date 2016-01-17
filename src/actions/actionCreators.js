import * as actions from './actionTypes'

export function setName(name) {
  return { type: actions.SET_NAME, name }
}

export function setAvatar(avatar) {
  return { type: actions.SET_AVATAR, avatar }
}

function setQuizzes(quizzes) {
  return { type: actions.SET_QUIZZES, quizzes }
}

function setQuiz(quiz) {
  return { type: actions.SET_QUIZ, quiz }
}

export function next() {
  return { type: actions.NEXT }
}

export function prev() {
  return { type: actions.PREV }
}

function setFirebaseRef(firebaseRef) {
  return { type: actions.SET_FIREBASE_REF, firebaseRef }
}

export function selectQuiz(quizId) {
  return { type: actions.SELECT_QUIZ, quizId }
}

export function selectQuestion(quizId, index) {
  return { type: actions.SELECT_QUESTION, quizId, index }
}

export function requestQuizzes() {
  return (dispatch, getState) => {
    const { firebaseRef } = getState()
    firebaseRef.child('quizzes').once('value', (snapshot) => {
      dispatch(setQuizzes(snapshot.val()))
    })
  }
}

function storeFirebase(val) {
  return {
    type: actions.STORE_FIREBASE,
    entries: val.entries,
    quizzes: val.quizzes,
    scores: val.scores,
  }
}

function storeScores(val) {
  return { type: actions.STORE_SCORES, val }
}

export function importFirebase(firebaseRef) {
  return (dispatch, getState) => {
    dispatch(setFirebaseRef(firebaseRef))

    firebaseRef.once('value', (snapshot) => {
      dispatch(storeFirebase(snapshot.val()))
    })
  }
}

export function listenToScoreChanges() {
  return (dispatch, getState) => {
    const { firebaseRef } = getState()

    firebaseRef.child('score').on('value', (snapshot) => {
      dispatch(storeScores(snapshot.val()))
    })
  }
}

// export function requestQuizInfo(quizId) {
//   return (dispatch, getState) => {
//     const { firebaseRef, history, quizzes } = getState()
//     let quiz = quizzes[quizId]
//     if (quizId in history) {
//       dispatch(selectQuiz(quizId))
//     } else {
//       // generate quiz
//       let entries = []
//       quiz.entries.forEach((element, index, array) => {
//         let s = firebaseRef.child('entries').child(element).once('value', (snapshot) => {
//           entries.push(snapshot.val())
//           console.log(entries)
//         })
//         console.log(entries)
//       })
//       console.log('entries')
//       console.log(entries)
//       entries = entries.sort(() => Math.random() - 0.5)  // shuffle entries
//       quiz = {
//         ...quiz,
//         entries: entries,
//         answers: {},
//         submitted: false,
//         index: 0,
//       }
//
//       dispatch(setQuiz(quiz, entries))
//       dispatch(selectQuiz(quizId))
//     }
//   }
// }

export function submitAnswer(entryId, answer) {
  return { type: actions.SUBMIT_ANSWER, entryId, answer }
}

export function submitResponse(quizId, name, score) {
  return { type: actions.SUBMIT_RESPONSE, quizId, name, score }
}

export function requestResponses(quizId) {
  return { type: actions.REQUEST_RESPONSES, quizId }
}
