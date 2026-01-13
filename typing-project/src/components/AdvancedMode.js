// import React, { useState, useEffect } from "react";
// import texts from "../data/texts.json";

// const applyAdvancedEffects = (text) => {
//   const mode = Math.floor(Math.random() * 3);

//   if (mode === 1) {
//     // Inverted text
//     return text.split("").reverse().join("");
//   }

//   if (mode === 2) {
//     // Random capitalization
//     return text
//       .split("")
//       .map((c) =>
//         Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()
//       )
//       .join("");
//   }

//   return text; // Normal
// };

// function AdvancedMode() {
//   const [currentText, setCurrentText] = useState("");
//   const [userInput, setUserInput] = useState("");
//   const [time, setTime] = useState(0);
//   const [isActive, setIsActive] = useState(false);
//   const [wpm, setWpm] = useState(0);
//   const [accuracy, setAccuracy] = useState(100);
//   const [isFinished, setIsFinished] = useState(false);

//   const loadText = () => {
//     const raw = texts[Math.floor(Math.random() * texts.length)];
//     setCurrentText(applyAdvancedEffects(raw));
//   };

//   useEffect(() => {
//     loadText();
//   }, []);

//   useEffect(() => {
//     let interval;
//     if (isActive && !isFinished) {
//       interval = setInterval(() => setTime((t) => t + 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isActive, isFinished]);

//   const handleInputChange = (e) => {
//     if (!isActive) setIsActive(true);
//     setUserInput(e.target.value);

//     if (e.target.value === currentText) {
//       setIsFinished(true);
//       calculateResults(e.target.value);
//     }
//   };

//   const calculateResults = (input = userInput) => {
//     const wordsTyped =
//       input.trim().length === 0 ? 0 : input.trim().split(" ").length;

//     setWpm(time > 0 ? Math.round((wordsTyped / time) * 60) : 0);

//     const correctChars = currentText
//       .split("")
//       .filter((char, i) => char === input[i]).length;

//     setAccuracy(
//       input.length === 0
//         ? 0
//         : Math.round((correctChars / currentText.length) * 100)
//     );
//   };

//   const handleStop = () => {
//     setIsActive(false);
//     setIsFinished(true);
//     calculateResults();
//   };

//   const handleRestart = () => {
//     setUserInput("");
//     setTime(0);
//     setIsActive(false);
//     setIsFinished(false);
//     setWpm(0);
//     setAccuracy(100);
//     loadText();
//   };

//   return (
//     <div className="container mt-5 pt-5">
//       <div className="mode-container">
//         <h2 className="text-center">Advanced Mode</h2>

//         <p className="typing-text text-center">
//           {currentText.split("").map((char, i) => (
//             <span
//               key={i}
//               className={
//                 userInput[i] === char
//                   ? "correct"
//                   : userInput[i]
//                   ? "incorrect"
//                   : ""
//               }
//             >
//               {char}
//             </span>
//           ))}
//         </p>

//         <textarea
//           className="form-control mt-3"
//           rows="4"
//           value={userInput}
//           onChange={handleInputChange}
//           placeholder="Type exactly as shown..."
//           disabled={isFinished}
//         />

//         <div className="d-flex justify-content-between mt-3">
//           <div>⏱ Time: {time}s</div>
//           {!isFinished ? (
//             <button className="btn btn-custom" onClick={handleStop}>
//               Stop
//             </button>
//           ) : (
//             <button className="btn btn-custom" onClick={handleRestart}>
//               Restart
//             </button>
//           )}
//         </div>

//         {isFinished && (
//           <div className="mt-3">
//             <h5>Results:</h5>
//             <p>⚡ WPM: {wpm}</p>
//             <p>🎯 Accuracy: {accuracy}%</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdvancedMode;


import React, { useState, useEffect } from "react";
import texts from "../data/texts.json";

// Advanced text effects
const applyAdvancedEffects = (text) => {
  const mode = Math.floor(Math.random() * 3);

  if (mode === 1) {
    // Inverted text
    return text.split("").reverse().join("");
  }

  if (mode === 2) {
    // Random capitalization
    return text
      .split("")
      .map((c) => (Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()))
      .join("");
  }

  return text; // Normal
};

function AdvancedMode() {
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // Load a new random sentence
  const loadText = () => {
    const raw = texts[Math.floor(Math.random() * texts.length)];
    setCurrentText(applyAdvancedEffects(raw));
    setUserInput("");
  };

  // Start 1-minute countdown when typing starts
  useEffect(() => {
    if (!isActive || isFinished) return;

    if (timeLeft === 0) {
      handleStop();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isFinished, timeLeft]);

  // Handle typing input
  const handleInputChange = (e) => {
    if (!isActive) setIsActive(true);
    setUserInput(e.target.value);
  };

  // Calculate WPM & Accuracy
  const calculateResults = () => {
    const wordsTyped =
      userInput.trim().length === 0 ? 0 : userInput.trim().split(" ").length;

    setWpm(Math.round((wordsTyped / (60 - timeLeft)) * 60));

    const correctChars = currentText
      .split("")
      .filter((char, i) => char === userInput[i]).length;

    setAccuracy(
      currentText.length === 0
        ? 0
        : Math.round((correctChars / currentText.length) * 100)
    );
  };

  // Stop / end game
  const handleStop = () => {
    setIsFinished(true);
    setIsActive(false);
    calculateResults();
  };

  const handleRestart = () => {
    setUserInput("");
    setTimeLeft(60);
    setIsActive(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    loadText();
  };

  // Load initial sentence
  useEffect(() => {
    loadText();
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <div className="mode-container">
        <h2 className="text-center mb-3">Advanced Mode</h2>
        <h5 className="text-center timer">⏱ Time Left: {timeLeft}s</h5>
        <p className="typing-text text-center">
          {currentText.split("").map((char, i) => (
            <span
              key={i}
              className={
                userInput[i] === char
                  ? "correct"
                  : userInput[i]
                  ? "incorrect"
                  : ""
              }
            >
              {char}
            </span>
          ))}
        </p>

        <textarea
          className="form-control mt-3"
          rows="4"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Start typing here..."
          disabled={isFinished}
        />

        <div className="text-center mt-3">
          {!isFinished ? (
            <button className="btn btn-custom" onClick={handleStop}>
              Stop
            </button>
          ) : (
            <button className="btn btn-custom" onClick={handleRestart}>
              Restart
            </button>
          )}
        </div>

        {isFinished && (
          <div className="mt-3">
            <h5>Results:</h5>
            <p>⚡ WPM: {wpm}</p>
            <p>🎯 Accuracy: {accuracy}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedMode;

