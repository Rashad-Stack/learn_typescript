import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import type { State } from "./types/Modules";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

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
  submitQuestion = "submitQuestion",
  restart = "restart",
  tick = "tick",
}

const initialState: State = {
  questions: [],
  status: Status.loading,
  error: "",
  index: 0,
  answer: null,
  points: 0,
  time: 10,
  highscore: 0,
};

type Action = {
  type: CaseType;
  payload?: any;
};

const SECS_PER_QUESTION: number = 30;

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
        index: 0,
        time: state.questions.length * SECS_PER_QUESTION,
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

    case CaseType.submitQuestion:
      return {
        ...state,
        status: Status.finished,
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };

    case CaseType.restart:
      return {
        ...initialState,
        questions: state.questions,
        status: Status.ready,
      };

    case CaseType.tick:
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? Status.finished : state.status,
      };

    default:
      return state;
  }
}

export default function App(): JSX.Element {
  const [
    { status, questions, index, answer, points, time, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
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
            <Progress
              index={index + 1}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              question={questions[index]}
              answer={answer!}
              dispatch={dispatch}
            />
            <Footer>
              <Timer time={time} dispatch={dispatch} />
              <NextButton
                title="Next Question"
                answer={answer!}
                dispatch={dispatch}
                index={index}
                numQuestions={questions.length}
              />
            </Footer>
          </>
        )}
        {status === Status.finished && (
          <FinishedScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
