import React from "react";

type Props = {
  title: string;
  answer: number;
  dispatch: React.Dispatch<any>;
};

export default function NextButton({
  title,
  dispatch,
  answer,
}: Props): JSX.Element | null {
  if (answer === null) return null;
  return (
    <button className="btn btn-ui" onClick={dispatch}>
      {title}
    </button>
  );
}
