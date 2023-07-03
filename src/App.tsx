import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import type { State } from "./types/Modules";

export enum Status {
  loading = "loading",
  error = "error",
  ready = "ready",
  active = "active",
  finished = "finished",
}

export enum CaseType {
  dataReceived = "dataReceived",
  dataFailed = "dataFailed",
}

const initialState: State = {
  questions: [],
  status: Status.loading,
  error: "",
};

type Action = {
  type: CaseType;
  payload: any;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case CaseType.dataReceived:
      return {
        ...state,
        questions: action.payload,
        status: Status.ready,
      };

    case CaseType.dataFailed:
      return {
        ...state,
        status: Status.error,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export default function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  useEffect(function () {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: CaseType.dataReceived, payload: data }))
      .catch((err) => dispatch({ type: CaseType.dataFailed, payload: err }));
  }, []);

  return (
    <>
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions</p>
      </Main>
    </>
  );
}
