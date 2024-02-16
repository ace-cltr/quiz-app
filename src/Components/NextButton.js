import React from 'react'

export default function NextButton({ dispatch, answer, index, length }) {

    if (answer === null) return null; // to check if there is no answer then return null or hide the button

    if (index < length-1)  return (
        <button className='btn btn-ui' onClick={()=>dispatch({type: 'nextQuestion'})}>
            Next
        </button>
    )
    if (index === length-1)  return (
        <button className='btn btn-ui' onClick={()=>dispatch({type: 'finish'})}>
            Finish
        </button>
    )
}
