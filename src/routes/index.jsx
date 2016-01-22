import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import About from '../components/About/About.jsx'
import Quiz from '../components/Quizzes/Quiz.jsx'
import QuizCard from '../components/Quizzes/QuizCard'
import Profile from '../components/Profile/Profile.jsx'
import { Route, IndexRoute } from 'react-router'

const Routes = (
  <Route path="/" component={App}>
    <Route path="about" component={About} />
    <Route path="profile" component={Profile} />
    <Route path="app" component={Quiz}>
    </Route>
    <IndexRoute component={Quiz} />
  </Route>
);

export default Routes;
