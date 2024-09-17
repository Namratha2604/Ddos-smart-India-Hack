import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginForm.css';
import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa";

const LoginForm = () => {
  const [captchaOptions, setCaptchaOptions] = useState(generateCaptcha());
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const navigate = useNavigate(); 

  function generateCaptcha() {
    const counts = Array.from({ length: 4 }, () => Math.floor(Math.random() * 3) + 1);

    const maxCount = Math.max(...counts);

    
    const validIndices = counts
      .map((count, index) => (count === maxCount ? index : null))
      .filter((index) => index !== null);

    return { counts, validIndices };
  }
 
  const handleCaptchaClick = (index) => {
    if (captchaOptions.validIndices.includes(index)) {
      setCaptchaSolved(true);
      alert('CAPTCHA solved!');
    } else {
      alert('Wrong choice, try again.');
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaSolved) {
      alert('Form Submitted Successfully!');
      navigate('/verification'); 
    } else {
      alert('Please solve the CAPTCHA first.');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="register-link">
          <p>Don't have an account? <a href='#'>Register</a></p>
        </div>
        <div className="input-box">
          <input type="text" placeholder='your account username' required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='your account password' required />
          <FaLock className='icon' />
        </div>

        {/* CAPTCHA Section */}
        <div className="captcha-box">
          <p>Click on any icon that appears the most number of times:</p>
          <div className="captcha-inline">
            {captchaOptions.counts.map((count, index) => (
              <button
                type="button"
                key={index}
                className="captcha-button"
                onClick={() => handleCaptchaClick(index)}
              >
                <FaShieldAlt className="icon" />
                <span>{count}</span>
              </button>
            ))}
          </div>
        </div>

        <button type='submit' disabled={!captchaSolved}>Login</button>
        <div className='remember-forgot'>
          <p><a href="#">forgot password?</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
