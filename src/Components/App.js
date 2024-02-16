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

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // status : 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining : null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved': return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed': return { ...state, status: 'error' }
    case 'start': return { ...state, status: 'active', timeRemaining : state.questions.length * SEC_PER_QUESTION }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state, answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points // checks if 
      }
    case 'nextQuestion': return { ...state, index: state.index + 1, answer: null }
    case 'finish': return { ...state, status: 'finished', highScore: state.points > state.highScore ? state.points : state.highScore }
    case 'retake': return { ...initialState, status: 'active', questions: state.questions} // index: 0, points: 0, answer: null 
    case 'forTimer': return {...state, timeRemaining : state.timeRemaining -1, status : state.timeRemaining === 0 ? 'finished' : state.status}
    default: throw new Error('Invalid action')
  }
}

function App() {

  const [{ questions, status, index, answer, points, highScore, timeRemaining }, dispatch] = useReducer(reducer, initialState)

  const length = questions.length

  let totalPoints = questions.reduce((acc, val) => acc + val.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecieved', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])


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
