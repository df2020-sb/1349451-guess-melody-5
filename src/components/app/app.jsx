import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import WelcomeScreen from "../welcome-screen/welcome-screen";
import LoginScreen from "../login-screen/login-screen";
import SuccessScreen from "../success-screen/success-screen";
import FailureScreen from "../failure-screen/failure-screen";
import GameScreen from "../game-screen/game-screen";
import {MAX_MISTAKE_COUNT} from "../../const";

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact
          path="/"
          render={({history}) => (
            <WelcomeScreen
              onPlayButtonClick={() => history.push(`/game`)}
              errorsCount={MAX_MISTAKE_COUNT}
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
          <GameScreen errorsCount={MAX_MISTAKE_COUNT}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
