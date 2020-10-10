import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import LoginScreen from "../login-screen/login-screen";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen";
import SuccessScreen from "../success-screen/success-screen";
import FailureScreen from "../failure-screen/failure-screen";
import GameScreen from "../game-screen/game-screen";


const App = (props) => {
  const {errorsCount, questions} = props;
  const [firstQuestion, secondQuestion] = questions;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact
          path="/"
          render={({history}) => (
            <WelcomeScreen
              onPlayButtonClick={() => history.push(`/game`)}
              errorsCount={errorsCount}
            />
          )}
        />
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/dev-artist">
          <QuestionArtistScreen question={secondQuestion} onAnswer={() => {}} />
        </Route>
        <Route exact path="/dev-genre">
          <QuestionGenreScreen question={firstQuestion} onAnswer={() => {}}/>
        </Route>
        <Route exact path="/result">
          <SuccessScreen />
        </Route>
        <Route exact path="/lose">
          <FailureScreen />
        </Route>
        <Route exact path="/game">
          <GameScreen errorsCount={errorsCount} questions={questions}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
