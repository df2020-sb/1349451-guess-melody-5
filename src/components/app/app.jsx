import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import LoginScreen from "../login-screen/login-screen";
import QuestionArtistScreen from "../question-artist-screen/question-artist-screen";
import QuestionGenreScreen from "../question-genre-screen/question-genre-screen";
import SuccessScreen from "../success-screen/success-screen";
import FailureScreen from "../failure-screen/failure-screen";


const App = (props) => {
  const {errorsCount} = props;

  App.propTypes = {
    errorsCount: PropTypes.number.isRequired,
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen errorsCount={errorsCount} />
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/dev-artist">
          <QuestionArtistScreen />
        </Route>
        <Route exact path="/dev-genre">
          <QuestionGenreScreen />
        </Route>
        <Route exact path="/result">
          <SuccessScreen />
        </Route>
        <Route exact path="/lose">
          <FailureScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
