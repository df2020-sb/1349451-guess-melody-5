import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import LoginScreen from "../login-screen/login-screen";
import SuccessScreen from "../success-screen/success-screen";
import FailureScreen from "../failure-screen/failure-screen";
import GameScreen from "../game-screen/game-screen";

import questionGenreProp from "../question-genre-screen/question-genre.prop";
import questionArtistProp from "../question-artist-screen/question-artist.prop";

const App = (props) => {
  const {errorsCount, questions} = props;

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
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([questionArtistProp, questionGenreProp]).isRequired
  ),
};

export default App;
