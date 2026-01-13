import React from 'react';

function Home() {
  return (
    <div className="home-bg">
      <div className="container">
        <h1 className="display-4">Master Your Typing Skills</h1>
        <p className="lead">Unlock speed, accuracy, and fun with our interactive modes.</p>
        <div id="modesCarousel" className="carousel slide mt-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <h4>Simple Mode</h4>
              <p className='carousel-text'>Simple Mode is perfect for beginners or anyone looking to improve their typing skills at a comfortable pace. 
                You will practice with short, clear sentences that help you focus on building speed, accuracy, and confidence. 
                Track your words per minute and character accuracy as you progress and develop a strong foundation for more advanced typing challenges.
              </p>
            </div>
            <div className="carousel-item">
              <h4>Advanced Mode</h4>
              <p className='carousel-text'>Advanced Mode is designed to push your typing skills further with longer and more complex sentences. 
                Texts may include random capitalization or inverted words, requiring extra focus and precision. 
                This mode helps improve both speed and accuracy under challenging conditions, training your brain and fingers to adapt quickly to unpredictable text patterns and enhancing overall typing endurance.
            </p>
            </div>
            <div className="carousel-item">
              <h4>Game Mode</h4>
              <p className='carousel-text'>A sentence appears on the screen and you must type it exactly as shown.
                Each correct sentence increases your combo and score, while a single mistake costs a life and resets the combo.
                You have limited time per sentence, so accuracy and focus are more important than speed.
                Sentences appear in random order, keeping the challenge unpredictable.
                The game ends when all lives are lost or when you choose to stop.
            </p>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#modesCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#modesCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

