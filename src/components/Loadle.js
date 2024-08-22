import React from 'react';
import { useEffect } from 'react';
import useLoadle from '../hooks/useLoadle';
import Grid from './Grid';
export default function Loadle({solution}) {
    const { guess, guesses, isCorrect, turn, format, formats, handleKeyup, handleSelectGuess} = useLoadle(solution) 

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup) //use handleKeyup when a user types a letter.

        if(isCorrect){
            window.removeEventListener('keyup',handleKeyup)
            console.log('nice. winner.')
        }

        if(turn === 6){
            window.removeEventListener('keyup', handleKeyup)
            console.log('no more turns')
        }
        return () => window.removeEventListener('keyup',handleKeyup) //prevent multiple keyup events.
    }, [handleKeyup, isCorrect, turn])

    const handleDropdownChange = (event) => {
        const selectedGuess = event.target.value;
        handleSelectGuess(selectedGuess);
    }

  return (
    <div>
        current guess - {guess}
    <div>
    <Grid guess={guess} guesses={guesses} turn={turn} format={format} formats={formats} />
    </div>
    </div>
  )
}
