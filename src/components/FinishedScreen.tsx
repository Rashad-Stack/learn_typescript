import React from "react";

type Props = {
  points: number;
  maxPossiblePoints: number;
};

export default function FinishedScreen({
  points,
  maxPossiblePoints,
}: Props): JSX.Element {
  const percentage: number = (points / maxPossiblePoints) * 100;
  return (
    <p className="result">
      Your score <strong>{points}</strong> out of {maxPossiblePoints}{" "}
      {Math.ceil(percentage)}%
    </p>
  );
}
