import { React } from "react";

function App() {
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
        </header>
        <ul className='langs'>
          <li className='html'>HTML</li>
          <li className='css'>CSS</li>
          <li className='js'>Javascript</li>
          <li className='react'>React</li>
          <li className='ts'>Typescript</li>
          <li className='node'>Node.js</li>
          <li className='py'>Python</li>
          <li className='ruby'>Ruby</li>
          <li className='asm'>Assembly</li>
        </ul>
        <div className='letters'>
          <div className='letter-container'></div>
          <div className='letter-container'></div>
          <div className='letter-container'></div>
          <div className='letter-container'></div>
          <div className='letter-container'></div>
          <div className='letter-container'></div>
          <div className='letter-container'></div>
          <div className='letter-container'></div>
        </div>
    </main>
  );
}

export default App;
