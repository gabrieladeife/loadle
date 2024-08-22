import React from 'react'
import Row from './Row'

export default function Grid ({guess, guesses, turn, solution, format, formats}) {
  return (
    <div>
        {guesses.map((g, i) => {
          const rowFormats = JSON.parse(JSON.stringify(formats)); // Deep copy of formats
          const rowTurn = i + 1; // Ensure each row gets the correct turn value
          return (
            <Row 
              key={i} 
              guess={g} 
              guesses={guesses} 
              format={format} 
              formats={rowFormats} 
              turn={rowTurn} 
            />
          );
        })}
    </div>
  );
}
