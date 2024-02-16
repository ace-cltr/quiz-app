import React from 'react'

export default function Start({length, dispatch}) {

   const handleClick = ()=> dispatch({type : 'start'})

  return (
    <div className='start'>
      <h2>Welcome to the React Quiz</h2>
      <h3>{length} question</h3>
      <button className='btn btn-ui' onClick={handleClick} >Let's start</button>
    </div>
  )
}
