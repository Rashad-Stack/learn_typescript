import React from "react";
import { CaseType } from "../App";

type Props = {
  title: string;
  answer: number;
  dispatch: React.Dispatch<any>;
  numQuestions: number;
  index: number;
};

export default function NextButton({
  title,
  dispatch,
  answer,
  index,
  numQuestions,
}: Props): JSX.Element | null {
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: CaseType.nextQuestion })}>
        {title}
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: CaseType.submitQuestion })}>
        Submit
      </button>
    );
  }
}
