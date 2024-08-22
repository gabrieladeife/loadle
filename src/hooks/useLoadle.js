
import { useState, useEffect } from "react"; 

//functionality file 
const useLoadle = (solution) => {
    var [guess, setGuess] = useState([]);
    var [format, setFormat] = useState([]);
    const[formats, setFormats] = useState([]);
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [turn, setTurn] = useState(0);
    const [jsonArr, setJsonArr] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/solutions') // get response from json
        .then(res => res.json()) //make response useable for JS
        .then(json => {
          setJsonArr(json);
          console.log(jsonArr)
        })
      }, [])
//format guess into array of characteristics.
//e.g. [{gender:'male', color:'red'}]
var solCopy = jsonArr.find(searchName => searchName.name.includes(solution)) //copy of full solution json object
const formatGuess = () => {
   
  var formattedGuess = Object.keys(guess).map((item) => {
   return {name:item, color:'red'}
})

for (const key in solCopy) {
    if (solCopy[key] === guess[key]) {
      // Update color to 'green' if the guess matches the solution for certain keys
      if (key === 'name') formattedGuess[0].color = 'green';
      if (key === 'species') formattedGuess[1].color = 'green';
      if (key === 'gender') formattedGuess[2].color = 'green';
      if (key === 'location') formattedGuess[3].color = 'green';
      if (key === 'profession') formattedGuess[4].color = 'green';
    }

    // Handle complex comparison for the 'profession' field
    // Handle complex comparison for the 'profession' field
    if (key === 'profession' && formattedGuess[4].color !== 'green') {
        const solProfession = Array.isArray(solCopy.profession) ? solCopy.profession : [solCopy.profession];
        const guessProfession = Array.isArray(guess.profession) ? guess.profession : [guess.profession];

        if (solProfession.length === guessProfession.length && solProfession.every((item, index) => item === guessProfession[index])) {
            formattedGuess[4].color = 'green';
          } else if (solProfession.some(item => guessProfession.includes(item))) {
            // Partial match, set color to yellow
            formattedGuess[4].color = 'yellow';
          }
        }
      }
    
return formattedGuess
}

const addNewGuess = (guess) => {
    if (guess === solCopy){
        setIsCorrect(true)
    }

    setGuesses((prevGuesses) => {
        let newGuesses = [...prevGuesses]
        newGuesses[turn] = guess

        return newGuesses
    })

    setHistory((prevHistory) => {
        return [...prevHistory, guess]
    })

    setFormats((prevFormats) => {

        let newFormat = [...prevFormats]
        newFormat[turn] = format

        return newFormat
    })

    setTurn((prevTurn) => {
        return prevTurn + 1
    })
    setGuess('')
}

const handleKeyup = ({ key }) => {

    if (key === 'Enter') {
        //do not allow duplicate guesses.
        console.log('this is history', history)
        const isDuplicate = turn !== 0 && history.some(previousGuess => previousGuess.name.includes(guess));

    if (isDuplicate) {
        console.log('You just guessed this.');
        return;
    }
    //auto select if they press enter before full string.

    if (jsonArr.find(searchName => searchName.name.includes(guess))){
        guess = jsonArr.find(searchName => searchName.name.includes(guess))
        format = formatGuess(guess)
        setFormat(format)
        addNewGuess(guess)
    } 
}

if (key === 'Backspace') {
    setGuess((prev) => {
        return prev.slice(0,-1)
    })
    return
}
if (/^[A-Za-z\s()]$/.test(key)) { //if keyup is alphabet character, add.
    setGuess((prev) => {
        return prev + key 
    })
    }
}

const handleSelectGuess = (guess) => {
    console.log("Selected Guess:", guess); // Log the selected guess
};

return {turn, guess, guesses, isCorrect, format, formats, handleKeyup, handleSelectGuess, jsonArr}

}

export default useLoadle