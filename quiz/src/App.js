import React from 'react';
import './components/HomeComponent'
import HomeComponent from './components/HomeComponent';
import {BrowserRouter as Router, Route, useRouteMatch} from 'react-router-dom'
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent'

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeComponent}/>
      <Route path="/play/quiz" exact component={QuizComponent}/>
      <Route path="/play/quizSummary" exact component={ResultComponent}/>
    </Router>
    
  );
}

export default App;
