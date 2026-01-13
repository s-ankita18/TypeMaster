import React, { useEffect, useState } from "react";
import texts from "../data/texts.json";

const MAX_LIVES = 3;
const SENTENCE_TIME = 30;

const getRandomText = () => texts[Math.floor(Math.random() * texts.length)];

const GameMode = () => {
  const [currentText, setCurrentText] = useState(getRandomText());
  const [currentInput, setCurrentInput] = useState("");
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(SENTENCE_TIME);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // ✅ GLOBAL STATS (IMPORTANT)
  const [totalTypedChars, setTotalTypedChars] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalTypedWords, setTotalTypedWords] = useState(0);

  /* ⏱ ⏱TIMER */
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    if (timeLeft === 0) {
      handleMistake();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft]);

  /* ⌨️ INPUT HANDLER */
  const handleChange = (e) => {
    if (!gameStarted) setGameStarted(true);

    const value = e.target.value;
    setCurrentInput(value);

    // Track typed chars
    setTotalTypedChars((c) => c + 1);

    const index = value.length - 1;

    // Correct character
    if (value[index] === currentText[index]) {
      setTotalCorrectChars((c) => c + 1);
    } else {
      handleMistake();
      return;
    }

    // Sentence completed
    if (value === currentText) {
      const words = currentText.split(" ").length;
      setTotalTypedWords((w) => w + words);

      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setScore((s) => s + 100 * newCombo);

      setCurrentText(getRandomText());
      setCurrentInput("");
      setTimeLeft(SENTENCE_TIME);
    }
  };

  /* ❌ MISTAKE */
  const handleMistake = () => {
    setCombo(0);
    setCurrentInput("");
    setTimeLeft(SENTENCE_TIME);

    setLives((l) => {
      if (l - 1 <= 0) {
        endGame();
        return 0;
      }
      return l - 1;
    });
  };

  /* 🛑 STOP */
  const stopGame = () => {
    endGame();
  };

  const endGame = () => {
    setGameOver(true);
    setShowResult(true);
    setGameStarted(false);
  };

  const restartGame = () => {
    setCurrentText(getRandomText());
    setCurrentInput("");
    setCombo(0);
    setMaxCombo(0);
    setScore(0);
    setLives(MAX_LIVES);
    setTimeLeft(SENTENCE_TIME);
    setTotalTypedChars(0);
    setTotalCorrectChars(0);
    setTotalTypedWords(0);
    setGameStarted(false);
    setGameOver(false);
    setShowResult(false);
  };

  const accuracy =
    totalTypedChars === 0
      ? 0
      : Math.round((totalCorrectChars / totalTypedChars) * 100);

  return (
    <div className="container mt-5 pt-5">
      <div className="mode-container">
        <h2 className="text-center mb-3">🔥 Advanced Combo Mode</h2>
        {!showResult ? (
          <>
            <div className="stats text-center mb-2">
                <span className="me-2">❤️Lives: {lives}</span>
                <span className="me-2">🔥Combo: x{combo}</span>
                <span className="me-2">⭐Score: {score}</span>
                <span className="me-2">⌛Time: {timeLeft}s</span>
            </div>

            <p className="typing-text text-center">{currentText}</p>

            <textarea
              className="form-control mt-3"
              rows="3"
              value={currentInput}
              onChange={handleChange}
              disabled={gameOver}
              placeholder="Type the sentence..."
            />

            <div className="d-flex justify-content-center mt-3 gap-3">
              {gameStarted ? (
                <button className="btn btn-warning" onClick={stopGame}>
                  Stop
                </button>
              ) : (
                <button className="btn btn-custom" onClick={restartGame}>
                  Restart
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="game-over text-center">
            <h3>📊 Game Summary</h3>
            <p><strong>Score:</strong> {score}</p>
            <p><strong>Words Typed:</strong> {totalTypedWords}</p>
            <p><strong>Accuracy:</strong> {accuracy}%</p>
            <p><strong>Max Combo:</strong> x{maxCombo}</p>

            <button className="btn btn-custom mt-2" onClick={restartGame}>
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameMode;