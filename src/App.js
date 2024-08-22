import { useEffect, useState } from 'react';
import Loadle from './components/Loadle'
/*
Data we need to track:

-Solution:
    - Character Name
      -Includes character info (e.g. region, age(maybe), gender, hair color, species)
    - Past Guesses
      -Past Guesses are an array of the character guessed and their character info
*/
function App() {

  const [solution, setSolution] = useState(null) //allow for randomly chosen solution, null at start, update on new game.

  useEffect(() => {
    fetch('http://localhost:3001/solutions') // get response from json
    .then(res => res.json()) //make response useable for JS
    .then(json => {
      console.log(json)
      const randomSolution = json[Math.floor(Math.random()*json.length)] // choose a random solution from json array.
      setSolution(randomSolution)
    })
  }, [])

  return (
    
    <div className="App">

      <h1>Loadle</h1>
      {solution && <Loadle solution={solution.name}/>}
    </div>
  );
}

export default App;
