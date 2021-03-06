import {extend} from "../../../utils";
import {ActionType} from "../../action";
import {isArtistAnswerCorrect, isGenreAnswerCorrect} from "../../../game";
import {GameType} from "../../../const";

const initialState = {
  mistakes: 0,
  step: 0,
};

const gameProcess = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;
      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKES:

      let answerIsCorrect = false;

      switch (action.question.type) {
        case GameType.ARTIST:
          answerIsCorrect = isArtistAnswerCorrect(action.question, action.userAnswer);
          break;
        case GameType.GENRE:
          answerIsCorrect = isGenreAnswerCorrect(action.question, action.userAnswer);
          break;
      }

      const mistakes = answerIsCorrect ? state.mistakes : state.mistakes + 1;
      return extend(state, {mistakes});

    case ActionType.RESET_GAME:
      return extend({}, initialState);
  }

  return state;
};

export {gameProcess};
