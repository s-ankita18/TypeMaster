import React, { useState, useEffect } from 'react';
import texts from '../data/texts.json';

function SimpleMode() {
    const [currentText, setCurrentText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        setCurrentText(texts[Math.floor(Math.random() * texts.length)]);
    }, []);

    useEffect(() => {
        let interval;
        if (isActive && !isFinished) {
            interval = setInterval(() => setTime(time => time + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, isFinished]);

    const handleInputChange = (e) => {
        if (!isActive) setIsActive(true);
        setUserInput(e.target.value);
        if (e.target.value === currentText) {
            setIsFinished(true);
            calculateResults();
        }
    };

    const calculateResults = () => {
        // const wordsTyped = userInput.split(' ').length;
        const wordsTyped = userInput.trim().split(' ').length;
        setWpm(Math.round((wordsTyped / time) * 60));
        // const correctChars = userInput.split('').filter((char, i) => char === currentText[i]).length;
        const correctChars = currentText.split('').filter((char, i) => char === userInput[i]).length;
        setAccuracy(Math.round((correctChars / currentText.length) * 100));
    };

    const handleStop = () => {
        setIsActive(false);
        setIsFinished(true);
        calculateResults();
    };

    const handleRestart = () => {
        setUserInput('');
        setTime(0);
        setIsActive(false);
        setIsFinished(false);
        setWpm(0);
        setAccuracy(100);
        setCurrentText(texts[Math.floor(Math.random() * texts.length)]);
    };

  return (
    <div className="container mt-5 pt-5">
      <div className="mode-container">
        <h2 className="text-center">Simple Mode</h2>
        <p className="typing-text text-center">
            {currentText.split('').map((char, i) => (
                <span key={i} className={userInput[i] === char ? 'correct' : userInput[i] ? 'incorrect' : ''}>
                    {char}
                </span>
            ))}
        </p>
        <textarea
          className="form-control mt-3"
          rows="3" value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          disabled={isFinished}
        />
        <div className="d-flex justify-content-between mt-3">
          <div> ⏱ Time: {time}s</div>
          {!isFinished ? (
            <button className="btn btn-custom" onClick={handleStop}>Stop</button>
          ) : (
            <button className="btn btn-custom" onClick={handleRestart}>Restart</button>
          )}
        </div>
        {isFinished && (
          <div className="mt-3">
            <h5>Results:</h5>
            <p>⚡WPM: {wpm}</p>
            <p> 🎯 Accuracy: {accuracy}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimpleMode;