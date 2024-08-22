import React from 'react'


export default function Row({guess, turn, format, formats, guesses}) {
    const properties= ['name','species','gender','location','profession'];


    if(guess && format && turn)
    {
    

        const currentFormat = formats[turn - 1];
        if (!currentFormat) {
            console.error('Invalid turn value or formats array is not structured correctly');
            return null;
        }

        return (
            <div className="row past">
                {properties.map((property, index) => {
                    if (property === 'profession') {
                        // Join professions array with commas
                        const professions = guess[property].join(', ');
                        return (
                            <div
                                key={`${turn}-${property}-${professions}`}
                                className={currentFormat[index].color}
                            >
                                {professions}
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={`${turn}-${property}-${guess[property]}`}
                                className={currentFormat[index].color}
                            >
                                {guess[property]}
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
  return (
    <div className="row">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

