import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import PropTypes from "prop-types";

const App = (props) => {
  const {errorsCount} = props;

  App.propTypes = {
    errorsCount: PropTypes.number.isRequired,
  };

  return (
    <WelcomeScreen errorsCount={errorsCount} />
  );
};

export default App;
