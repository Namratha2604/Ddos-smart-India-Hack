import React, { useState } from 'react';
import './VerificationPage.css'; 

const VerificationPage = () => {
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [captchaChars, setCaptchaChars] = useState(generateCaptchaChars());
  const [currentFocus, setCurrentFocus] = useState(0);

 
  function generateRandomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  
  function generateCaptchaChars() {
    return Array.from({ length: 6 }, generateRandomChar);
  }

  
  const handleInputChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

 
  const handleFocus = (index) => {
    setCurrentFocus(index);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const correctSequence = captchaChars.join('');
    if (inputValues.join('') === correctSequence) {
      alert('Solved!');
    } else {
      alert('Incorrect, try again!');
    }
  };

  return (
    <div className="verification-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>DDos Protection</h1>
        <p>select the each text box and enter the letter or <br /> number you see within the circle below</p>
        <br />
        <div className="captcha-container">
          <div className="icon-box">
            {captchaChars[currentFocus]}
          </div>
        </div>
        <div className="input-row">
          {inputValues.map((value, index) => (
            <div key={index} className="input-container">
              <input
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                onFocus={() => handleFocus(index)}
                className="input-box"
              />
            </div>
          ))}
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerificationPage;
