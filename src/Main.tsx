import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Main({ children }: Props): JSX.Element {
  return <main className="main">{children}</main>;
}
