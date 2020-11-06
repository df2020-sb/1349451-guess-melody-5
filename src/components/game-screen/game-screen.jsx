import React from "react";
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import {incrementStep, incrementMistake, resetGame} from "../../store/action";
import {GameType, MAX_MISTAKE_COUNT, AppRoute} from '../../const';
import QuestionArtistScreen from '../question-artist-screen/question-artist-screen';
import QuestionGenreScreen from '../question-genre-screen/question-genre-screen';
import questionArtistProp from "../question-artist-screen/question-artist.prop";
import questionGenreProp from "../question-genre-screen/question-genre.prop";
import withAudioPlayer from "../../hocs/with-audio-player/with-audio-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import Mistakes from "../mistakes/mistakes";

const QuestionGenreScreenWrapped = withAudioPlayer(withUserAnswer(QuestionGenreScreen));
const QuestionArtistScreenWrapped = withAudioPlayer(QuestionArtistScreen);

const GameScreen = (props) => {

  const {questions, step, onUserAnswer, mistakes} = props;
  const question = questions[step];

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return (
      <Redirect to={AppRoute.LOSE} />
    );
  }

  if (step >= questions.length || !question) {
    return (
      <Redirect to={AppRoute.RESULT} />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <QuestionArtistScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}>
          <Mistakes count={mistakes}/>
        </QuestionArtistScreenWrapped>
      );
    case GameType.GENRE:
      return (
        <QuestionGenreScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}>
          <Mistakes count={mistakes}/>
        </QuestionGenreScreenWrapped>
      );
  }

  return <Redirect to={AppRoute.ROOT}/>;
};


GameScreen.propTypes = {
  questions: PropTypes.arrayOf(
      PropTypes.oneOfType([questionArtistProp, questionGenreProp]).isRequired
  ),
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
};

const mapStateToProps = ({GAME, DATA}) => ({
  step: GAME.step,
  mistakes: GAME.mistakes,
  questions: DATA.questions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGameAction() {
    dispatch(resetGame());
  },
  onUserAnswer(question, answer) {
    dispatch(incrementStep());
    dispatch(incrementMistake(question, answer));
  },
});


export {GameScreen};
export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
