import React from "react";

type Props = {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
};

export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
}: Props): JSX.Element {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index - 1} />
      <p>
        Question <strong>{index}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints} Points
      </p>
    </header>
  );
}
