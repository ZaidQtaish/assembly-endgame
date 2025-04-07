import { useState } from "react";
import clsx from "clsx";
import { languages } from "./languages";
import { getFarewellText, getRandomWord } from "./utils";
import Confetti from "react-confetti";

export default function App() {
  // State Values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static Values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const lettersElements = currentWord.split("").map((letter) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx("letter", {
      missed: isGameLost && !guessedLetters.includes(letter),
    });
    return (
      <div className={letterClassName} key={letter}>
        {shouldRevealLetter && letter.toUpperCase()}
      </div>
    );
  });

  const languageElements = languages.map((lang, index) => {
    const className = clsx({ lost: index < wrongGuessCount });
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <li className={className} style={styles} key={lang}>
        {lang.name}
      </li>
    );
  });

  const keysElements = alphabet.split("").map((key) => {
    const isGuessed = guessedLetters.includes(key);
    const isCorrect = isGuessed && currentWord.includes(key);
    const isWrong = isGuessed && !currentWord.includes(key);
    const className = clsx("key", {
      correct: isCorrect,
      wrong: isWrong,
    });
    return (
      <button
        disabled={isGameWon || isGameLost}
        aria-disabled={isGameWon || isGameLost}
        aria-label={`Letter ${key}`}
        key={key}
        className={className}
        onClick={() => guess(key)}
      >
        {key.toUpperCase()}
      </button>
    );
  });

  function guess(key) {
    if (!guessedLetters.includes(key))
      setGuessedLetters((prevLetters) => [...prevLetters, key]);
  }

  const gameStatusClass = clsx("status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameLost && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameLost && isLastGuessIncorrect) {
      const lang = languages[wrongGuessCount - 1].name;
      return <p>{getFarewellText(lang)}</p>;
    }
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    } else return null;
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className="langs">{languageElements}</section>
      <section className="letters">{lettersElements}</section>
      <section className="keyboard">{keysElements}</section>
      {(isGameWon || isGameLost) && (
        <button onClick={startNewGame} className="new-game">
          New Game
        </button>
      )}
    </main>
  );
}
