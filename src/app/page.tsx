"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createId } from "crypto-id";

const VerificationPage = () => {
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const [captchaChars, setCaptchaChars] = useState(generateCaptchaChars());
  const [currentFocus, setCurrentFocus] = useState(0);
  const getInitialTime = () => {
    const storedSeconds = localStorage.getItem("seconds");

    return {
      seconds: storedSeconds ? parseInt(storedSeconds) : 59,
    };
  };

  const [seconds, setSeconds] = useState(getInitialTime().seconds);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    // Save the timer state to localStorage
    localStorage.setItem("seconds", seconds.toString());

    return () => clearInterval(timerInterval);
  }, [seconds]);

  const router = useRouter();

  function generateRandomChar() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  function generateCaptchaChars() {
    return Array.from({ length: 6 }, generateRandomChar);
  }

  const handleInputChange = (e: any, index: any) => {
    const value = e.target.value.toUpperCase();
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleFocus = (index: any) => {
    setCurrentFocus(index);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const correctSequence = captchaChars.join("");
    if (inputValues.join("") === correctSequence) {
      alert("Solved!");
      const id = createId(52);
      router.replace(`/verify/${id}`);
    } else {
      alert("Incorrect, try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center p-8 rounded-lg border border-white/20 backdrop-blur-lg shadow-lg bg-transparent">
        <form onSubmit={handleSubmit} className="text-center w-full">
          <h1 className="text-white text-2xl mb-4">DDos Protection</h1>
          <p className="text-white mb-6">
            Select each text box and enter the letter or <br /> number you see
            within the circle below
          </p>
          <div className="mb-5 w-full flex justify-center">
            <div className="bg-white text-black text-xl rounded-full w-12 h-12 flex items-center justify-center">
              {captchaChars[currentFocus]}
            </div>
          </div>
          <div className="flex justify-center gap-4 mb-2">
            {inputValues.map((value, index) => (
              <div key={index} className="">
                <input
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={() => handleFocus(index)}
                  className="text-center text-black text-lg w-10 h-10 border rounded-md"
                />
              </div>
            ))}
          </div>
          <div className="h-10 rounded-full w-full flex items-center justify-center">
            <span className="font-bold">
              {seconds.toString().padStart(2, "0")}
            </span>
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-white text-gray-800 font-semibold rounded-full shadow hover:bg-gray-800 hover:text-white transition-colors duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;
