import React from 'react'

export default function ProgressBar({ index, numQuestions, points, totalPoints, answer }) {
    return (
        <div className='progress'>
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
            <p>Points <strong>{points}</strong> / {totalPoints}</p>
        </div>
    )
}
