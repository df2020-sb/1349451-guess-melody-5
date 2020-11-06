import React from "react";
import {Switch, Route, Router as BrowserRouter} from "react-router-dom";
import PrivateRoute from "../private-route/private-route";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import LoginScreen from "../login-screen/login-screen";
import SuccessScreen from "../success-screen/success-screen";
import FailureScreen from "../failure-screen/failure-screen";
import GameScreen from "../game-screen/game-screen";
import {MAX_MISTAKE_COUNT, AppRoute} from "../../const";
import browserHistory from "../../browser-history";

const App = () => {

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={({history}) => (
            <WelcomeScreen
              onPlayButtonClick={() => history.push(AppRoute.GAME)}
              errorsCount={MAX_MISTAKE_COUNT}
            />
          )}
        />
        <Route exact path={AppRoute.LOGIN}
          render={({history}) => (
            <LoginScreen onReplayButtonClick={() => history.push(AppRoute.GAME)}/>
          )}
        />
        <PrivateRoute
          exact
          path={AppRoute.RESULT}
          render={({history}) => {
            return (
              <SuccessScreen
                onReplayButtonClick={() => history.push(AppRoute.GAME)}
              />
            );
          }}
        />
        <Route exact path={AppRoute.LOSE}
          render={({history}) => (
            <FailureScreen onReplayButtonClick={() => history.push(AppRoute.GAME)}/>
          )}
        />
        <Route exact path={AppRoute.GAME}>
          <GameScreen errorsCount={MAX_MISTAKE_COUNT}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;
