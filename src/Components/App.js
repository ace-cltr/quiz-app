import '../index.css';
import Header from './Header';
import Main from './Main';
import { useEffect } from 'react';
import { useReducer } from 'react';
import Loader from './Loader';
import Error from './Error';
import Start from './Start';
import Active from './Active';
import NextButton from './NextButton';
import ProgressBar from './ProgressBar';
import FinishedScreen from './FinishedScreen';
import Footer from './Footer';
import Timer from './Timer';


const questions = [
  {
    "question": "Which is the most popular JavaScript framework?",
    "options": ["Angular", "React", "Svelte", "Vue"],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "Which company invented React?",
    "options": ["Google", "Apple", "Netflix", "Facebook"],
    "correctOption": 3,
    "points": 10
  },
  {
    "question": "What's the fundamental building block of React apps?",
    "options": ["Components", "Blocks", "Elements", "Effects"],
    "correctOption": 0,
    "points": 10
  },
  {
    "question": "What's the name of the syntax we use to describe the UI in React components?",
    "options": ["FBJ", "Babel", "JSX", "ES2015"],
    "correctOption": 2,
    "points": 10
  },
  {
    "question": "How does data flow naturally in React apps?",
    "options": [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides"
    ],
    "correctOption": 0,
    "points": 10
  },
  {
    "question": "How to pass data into a child component?",
    "options": ["State", "Props", "PropTypes", "Parameters"],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "When to use derived state?",
    "options": [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable"
    ],
    "correctOption": 3,
    "points": 30
  },
  {
    "question": "What triggers a UI re-render in React?",
    "options": [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements"
    ],
    "correctOption": 2,
    "points": 20
  },
  {
    "question": "When do we directly \"touch\" the DOM in React?",
    "options": [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never"
    ],
    "correctOption": 3,
    "points": 20
  },
  {
    "question": "In what situation do we use a callback to update state?",
    "options": [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state"
    ],
    "correctOption": 3,
    "points": 30
  },
  {
    "question": "If we pass a function to useState, when will that function be called?",
    "options": [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state"
    ],
    "correctOption": 2,
    "points": 30
  },
  {
    "question": "Which hook to use for an API request on the component's initial render?",
    "options": ["useState", "useEffect", "useRef", "useReducer"],
    "correctOption": 1,
    "points": 10
  },
  {
    "question": "Which variables should go into the useEffect dependency array?",
    "options": [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up"
    ],
    "correctOption": 2,
    "points": 30
  },
  {
    "question": "An effect will always run on the initial render.",
    "options": [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect"
    ],
    "correctOption": 0,
    "points": 30
  },
  {
    "question": "When will an effect run if it doesn't have a dependency array?",
    "options": [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered"
    ],
    "correctOption": 3,
    "points": 20
  }
]



const SEC_PER_QUESTION = 30;

const initialState = {
  questions: questions,
  // status : 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved': return { ...state, status: 'ready' }
    case 'dataFailed': return { ...state, status: 'error' }
    case 'start': return { ...state, status: 'active', timeRemaining: state.questions.length * SEC_PER_QUESTION }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state, answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points // checks if 
      }
    case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }
    case 'finish': return { ...state, status: 'finished', highScore: state.points > state.highScore ? state.points : state.highScore }
    case 'retake': return { ...initialState, status: 'active', questions: state.questions } // index: 0, points: 0, answer: null 
    case 'forTimer': return { ...state, timeRemaining: state.timeRemaining - 1, status: state.timeRemaining === 0 ? 'finished' : state.status }
    default: throw new Error('Invalid action')
  }
}

function App() {

  const [{ questions, status, index, answer, points, highScore, timeRemaining }, dispatch] = useReducer(reducer, initialState)

  const length = questions.length

  let totalPoints = questions.reduce((acc, val) => acc + val.points, 0)

  useEffect(() => {
    dispatch({ type: 'dataRecieved', payload: questions })
    // fetch('http://localhost:8000/questions')
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
    //   .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [questions])


  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'ready' && <Start dispatch={dispatch} length={length} />}
        {status === 'error' && <Error />}
        {status === 'active' && <>
          <ProgressBar index={index}
            numQuestions={length}
            points={points}
            totalPoints={totalPoints}
            answer={answer} />
          <Active
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
            <NextButton dispatch={dispatch}
              answer={answer}
              index={index}
              length={length} />
          </Footer>
        </>}
        {status === 'finished' && <FinishedScreen points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch} />}
      </Main>
    </div>
  );
}

export default App;
