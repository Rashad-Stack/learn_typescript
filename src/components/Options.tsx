import React from "react";
import { CaseType } from "../App";
import type { Question } from "../types/Modules";

type Props = {
  question: Question;
  dispatch: React.Dispatch<any>;
  answer: number;
};

export default function Option({
  question,
  dispatch,
  answer,
}: Props): JSX.Element {
  return (
    <div className="options">
      {question.options.map((option: string, index: number) => (
        <button
          key={option}
          onClick={() => dispatch({ type: CaseType.newAnswer, payload: index })}
          disabled={answer !== null}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}>
          {option}
        </button>
      ))}
    </div>
  );
}
