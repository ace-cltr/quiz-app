import React from 'react'

export default function Options({ question, dispatch, answer }) {

  const hasAnswered = answer !== null

  return (
    <div> {/* this line is just to add className answer & correct to move and chnange color of the answers */}
      <div className='options'>
         {question.options.map((el, index) => 
          <button className={`btn btn-option ${index === answer ? 'answer' : ''} 
           ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`} 
            key={el}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
            {el}
          </button>)
        }
      </div>
    </div>
  )
}
