import React from "react";
import { CaseType } from "../App";

type Props = {
  points: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<any>;
  highscore: number;
};

export default function FinishedScreen({
  points,
  maxPossiblePoints,
  dispatch,
  highscore,
}: Props): JSX.Element {
  const percentage: number = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        Your score <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        {Math.ceil(percentage)}%
      </p>
      <p className="highscore">(Highscrore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: CaseType.restart })}>
        Restart Quiz
      </button>
    </>
  );
}
