import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import {ActionCreator} from "../../store/action";
import {GameType} from '../../const';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import questionArtistProp from "../question-artist-screen/question-artist.prop";
import questionGenreProp from "../question-genre-screen/question-genre.prop";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import Mistakes from "../mistakes/mistakes";

const QuestionGenreScreenWrapped = withAudioPlayer(QuestionGenreScreen);
const QuestionArtistScreenWrapped = withAudioPlayer(QuestionArtistScreen);

const GameScreen = (props) => {

  const {questions, step, onUserAnswer, resetGame, mistakes} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    resetGame();
    return (
      <Redirect to="/" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <QuestionArtistScreenWrapped
          question={question}
          onAnswer={onUserAnswer}>
          <Mistakes count={mistakes}/>
        </QuestionArtistScreenWrapped>
      );
    case GameType.GENRE:
      return (
        <QuestionGenreScreenWrapped
          question={question}
          onAnswer={onUserAnswer}>
          <Mistakes count={mistakes}/>
        </QuestionGenreScreenWrapped>
      );
  }

  return <Redirect to="/" />;
};


GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([questionArtistProp, questionGenreProp]).isRequired
  ),
  step: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  mistakes: state.mistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(question, answer));
  },
});

export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
