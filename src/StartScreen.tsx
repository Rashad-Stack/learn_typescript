import React from "react";
import { CaseType } from "./App";

type Props = {
  numberOfQuestions: number;
  dispatch: React.Dispatch<any>;
};

export default function StartScreen({
  numberOfQuestions,
  dispatch,
}: Props): JSX.Element {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: CaseType.start })}>
        Let's start
      </button>
    </div>
  );
}
