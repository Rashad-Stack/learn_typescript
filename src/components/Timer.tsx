import React from "react";
import { CaseType } from "../App";

type Props = {
  dispatch: React.Dispatch<any>;
  time: number;
};

export default function Timer({ time, dispatch }: Props) {
  const minutes = Math.floor(time / 60);
  const second = time % 60;

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: CaseType.tick });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 && "0"}:{second < 10 && "0"}
      {second}
    </div>
  );
}
