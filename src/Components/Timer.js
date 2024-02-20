import { React, useEffect } from 'react'

export default function Timer({ dispatch, timeRemaining }) {

    const min = Math.floor(+timeRemaining / 60)
    const sec = +timeRemaining % 60

    // const min = Math.floor(timeRemaining / 60): This line calculates the remaining minutes
    // by dividing timeRemaining (which is in seconds) by 60(the number of seconds in a minute).
    // The Math.floor() function is used to round down to the nearest whole number,
    // ensuring that you get the integer part of the division operation.This gives you the number of whole minutes remaining.

    // const sec = timeRemaining % 60: This line calculates the remaining seconds by taking the remainder of timeRemaining divided by 60.
    // The % (modulo) operator returns the remainder of the division operation.Since there are 60 seconds in a minute,
    // taking the remainder by dividing by 60 gives you the number of seconds remaining after accounting for whole minutes.

        useEffect(() => {
            const id = setInterval(() => {

                dispatch({ type: 'forTimer' })

            }, 1000)

            return () => clearInterval(id)
        }, [dispatch])
    return (
            <div className='timer'>
                {min < 10 && '0'}{min}:{sec < 10 && '0'}{sec}
            </div>
        )
}
