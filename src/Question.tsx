import React from "react";
import type { Question as Quiz } from "./types/Modules";
import Options from "./components/Options";

type Props = {
  dispatch: React.Dispatch<any>;
  question: Quiz;
  answer: number;
};

export default function Question({
  dispatch,
  question,
  answer,
}: Props): JSX.Element {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
