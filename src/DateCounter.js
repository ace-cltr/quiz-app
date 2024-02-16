import { useReducer, useState } from "react";

const initialState = { count: 0, step: 1 }

function reducer(state, action) { // this is the reducer function which have two args state which holds curr state values and action comes from dispatch
  console.log(state, action)             
  switch (action.type) {  // action.type checks here what are the types in dispatch object and returns value according to that
    case 'inc': return { ...state, count: state.count + state.step }  // we usually use switch case to capare the action type
    case 'dec': return { ...state, count: state.count - state.step }
    case 'setCount': return { ...state, count: action.payload }
    case 'setStep': return { ...state, step : action.payload }
    case 'reset' : return initialState
    default: throw new Error ('Invalid action')
  }
  // if(action.type === 'inc') return state + 1
  // if(action.type === 'dec') return state - 1
  // if(action.type === 'set') return action.payload
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState) 
  // useReducer hook take two arguments 1) current state and 2) reducer function

  const { count, step } = state

  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec' })  // here is the dispatch function which is basically an object it has 2 values type and payload 
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: 'inc' })
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) }) // type is naming convention and payload defines what value will get into reducer fucntion
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({type : 'setStep', payload: Number(e.target.value)})
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type : 'reset'})
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
