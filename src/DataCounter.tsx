import React, { useReducer } from "react";

type Action = {
  type: string;
  payload?: number;
};

type State = {
  count: number;
  step: number;
};

const initialState: State = {
  count: 0,
  step: 1,
};

function reducer(state: State, action: Action): State {
  console.log(state, action);
  switch (action.type) {
    case "inc":
      return {
        ...state,
        count: state.count + state.step,
      };

    case "dec":
      return {
        ...state,
        count: state.count - state.step,
      };

    case "setCount":
      if (action.payload) {
        return {
          ...state,
          count: action.payload,
        };
      }
      return state;

    case "setStep":
      if (action.payload) {
        return {
          ...state,
          step: action.payload,
        };
      }
      return state;

    case "reset":
      return {
        ...state,
        count: 0,
        step: 1,
      };

    default:
      return state;
  }
}

export default function DataCounter(): JSX.Element {
  //   const [count, setCount] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date: Date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function (): void {
    dispatch({ type: "dec" });
  };

  const inc = function (): void {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };
  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
