import React from 'react'

export default function FinishedScreen({ points, totalPoints, highScore, dispatch }) {

    const scorePercentage = (points / totalPoints) * 100
    let emoji;
    if (scorePercentage === 100) emoji = '🥇'
    if (scorePercentage >= 80 && scorePercentage < 100) emoji = '⭐'
    if (scorePercentage >= 60 && scorePercentage < 80) emoji = '🫡'
    if (scorePercentage >= 30 && scorePercentage < 60) emoji = '🤦🏻'
    if (scorePercentage === 0) emoji = '🥹'

    return (
        <>
            <p className='result'>
                <span>{emoji}</span> You scored <strong>{points} out of {totalPoints} ({Math.ceil(scorePercentage)}%)</strong>
            </p>
            <p className='highscore'>( Your current high score : {highScore} points )</p>
            <button className='btn btn-ui' onClick={()=> dispatch({type: 'retake'})} >Retake</button>
        </>
    )
}
