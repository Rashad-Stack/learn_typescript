import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import type { State } from "./types/Modules";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton";

export enum Status {
  loading = "loading",
  error = "error",
  ready = "ready",
  active = "active",
  finished = "finished",
}

export enum CaseType {
  dataReceived = "dataReceived",
  dataFailed = "dataFailed",
  start = "start",
  newAnswer = "newAnswer",
  nextQuestion = "nextQuestion",
  prevQuestion = "prevQuestion",
}

const initialState: State = {
  questions: [],
  status: Status.loading,
  error: "",
  index: 0,
  answer: null,
  points: 0,
};

type Action = {
  type: CaseType;
  payload?: any;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case CaseType.dataReceived:
      return {
        ...state,
        questions: action.payload,
        status: Status.ready,
      };

    case CaseType.dataFailed:
      return {
        ...state,
        status: Status.error,
      };

    case CaseType.start:
      return {
        ...state,
        status: Status.active,
      };

    case CaseType.newAnswer:
      const question = state.questions.at(state.index);

      let points: number;
      if (question) {
        points =
          question?.correctOption === action.payload
            ? state.points + question?.points
            : state.points;
      } else {
        points = state.points;
      }

      return {
        ...state,
        answer: action.payload,
        points: points,
      };

    case CaseType.nextQuestion:
      return {
        ...state,
        index: state.questions.length > state.index + 1 ? state.index + 1 : 0,
        answer: null,
      };

    case CaseType.prevQuestion:
      return {
        ...state,
        index: state.index < 0 ? 0 : state.index - 1,
        answer: null,
      };

    default:
      return state;
  }
}

export default function App(): JSX.Element {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: CaseType.dataReceived, payload: data }))
      .catch((err) => dispatch({ type: CaseType.dataFailed, payload: err }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === Status.loading && <Loader />}
        {status === Status.error && <Error />}
        {status === Status.ready && (
          <StartScreen
            numberOfQuestions={questions.length}
            dispatch={dispatch}
          />
        )}
        {status === Status.active && (
          <>
            <Question
              question={questions[index]}
              answer={answer!}
              dispatch={dispatch}
            />
            <NextButton
              title="Next Question"
              answer={answer!}
              dispatch={() => dispatch({ type: CaseType.nextQuestion })}
            />
          </>
        )}
      </Main>
    </div>
  );
}
