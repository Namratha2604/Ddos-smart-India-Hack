"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createId } from "crypto-id";


const VerificationPage = () => {
	const [inputValues, setInputValues] = useState(Array(6).fill(""));
	const [captchaChars, setCaptchaChars] = useState(generateCaptchaChars());
	const [currentFocus, setCurrentFocus] = useState(0);
	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
	const [isBlocked, setIsBlocked] = useState(false); 
	const router = useRouter();

	const isBrowser = () => typeof window !== "undefined";

	const getBlockTime = () => {
		if (isBrowser()) {
			const storedBlockTime = localStorage.getItem("blockTime");
			return storedBlockTime ? parseInt(storedBlockTime) : null;
		}
		return null;
	};

	const getInitialTime = () => {
		if (isBrowser()) {
			const storedSeconds = localStorage.getItem("seconds");
			return {
				seconds: storedSeconds ? parseInt(storedSeconds) : 59,
			};
		}
		return { seconds: 59 };
	};

	const [seconds, setSeconds] = useState(getInitialTime().seconds);

	useEffect(() => {
	
		const blockTime = getBlockTime();
		if (blockTime && Date.now() < blockTime) {
			setIsBlocked(true);
			const remainingTime = Math.floor((blockTime - Date.now()) / 1000);
			setSeconds(remainingTime);
			const blockInterval = setInterval(() => {
				setSeconds((prev) => prev - 1);
				if (remainingTime <= 0) {
					clearInterval(blockInterval);
					setIsBlocked(false);
					localStorage.removeItem("blockTime");
				}
			}, 1000);
			return () => clearInterval(blockInterval);
		}

		// Timer --> logic
		const timerInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else {
				localStorage.clear();
				window.location.reload();
			}
		}, 1000);

		localStorage.setItem("seconds", seconds.toString());

		return () => clearInterval(timerInterval);
	}, [seconds]);

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

		if (isBlocked) {
			alert("You are blocked. Please try again after 1 minute.");
			return;
		}

		if (inputValues.join("") === correctSequence) {
			alert("Solved!");
			const id = createId();
			router.replace(`/${id}`);
		} else {
			const newAttempts = incorrectAttempts + 1;
			setIncorrectAttempts(newAttempts);

			if (newAttempts >= 5) {
				
				fetch("/api/blockUser", { method: "POST", body: JSON.stringify({ id: createId() }) })
					.then(() => {
						const blockTime = Date.now() + 60000; 
						localStorage.setItem("blockTime", blockTime.toString());
						setIsBlocked(true);
						setSeconds(60); 
						alert("You have been blocked for 1 minute.");
						router.replace("/blockedPage"); 
					})
					.catch((error) => console.error("API Error:", error));
			} else {
				alert("Incorrect, try again!");
			}
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="flex flex-col items-center p-8 rounded-lg border border-white/20 backdrop-blur-lg shadow-lg bg-transparent">
				<form onSubmit={handleSubmit} className="text-center w-full">
					<h1 className="text-white text-2xl mb-4">DDos Protection</h1>
					<p className="text-white mb-6">
						Select each text box and enter the letter or <br/> number you see within the circle below
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
									disabled={isBlocked} // Disable input if blocked
								/>
							</div>
						))}
					</div>
					<div className="h-10 rounded-full w-full flex items-center justify-center">
						<span className="font-bold">{seconds.toString().padStart(2, "0")}</span>
					</div>
					<button
						type="submit"
						className="w-full h-12 bg-white text-gray-800 font-semibold rounded-full shadow hover:bg-gray-800 hover:text-white transition-colors duration-300"
						disabled={isBlocked} // Disable button if blocked
					>
						{isBlocked ? "Blocked" : "Verify"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default VerificationPage;