"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createId } from "crypto-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function VerificationPage() {
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));
  const [captchaChars, setCaptchaChars] = useState<string[]>(Array(6).fill(""));
  const [currentFocus, setCurrentFocus] = useState(0);
  const [correctSequence, setCorrectSequence] = useState<string>();
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [isBlocked, setIsBlocked] = useState(false); 
  
  
  useEffect(() => {
    const storedSeconds = localStorage.getItem("seconds");
    if (storedSeconds) {
      setSeconds(parseInt(storedSeconds));
    }
  },[]);

  const router = useRouter();
  const { toast } = useToast();
  const isBrowser = () => typeof window !== "undefined";

  useEffect(()=> {
    async function getCaptcha(){
      const res = await axios.get("/api/getCaptcha");
      setCaptchaChars(res.data.message);
      const temp = res.data.message.join("");
      setCorrectSequence(temp);
    }
   
    getCaptcha();
  },[]);

  useEffect(() => {
    let blockInterval: NodeJS.Timeout;
    const blockTime = getBlockTime();
    let initialSeconds = 59;
    
    // Load the remaining seconds from localStorage (if they exist)
    const storedSeconds = localStorage.getItem("seconds");
    if (storedSeconds) {
      initialSeconds = parseInt(storedSeconds);
      setSeconds(initialSeconds);
    }
  
    // Start the countdown logic
    const startCountdown = () => {
      blockInterval = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 0) {
            const updatedSeconds = prev - 1;
            localStorage.setItem("seconds", updatedSeconds.toString()); 
            return updatedSeconds;
          } else {
            clearInterval(blockInterval);
            setIsBlocked(false);
            localStorage.removeItem("blockTime");
            localStorage.removeItem("seconds");
            window.location.reload(); // Reload->0
            return 0;
          }
        });
      }, 1000);
    };
  
    // Check if -> existing block time
    if (blockTime && Date.now() < blockTime) {
      setIsBlocked(true);
      const remainingTime = Math.floor((blockTime - Date.now()) / 1000);
      setSeconds(remainingTime > initialSeconds ? initialSeconds : remainingTime);
      startCountdown(); 
    } else {
      startCountdown(); 
    }
  
    return () => clearInterval(blockInterval); 
  }, []);
  
  const getBlockTime = () => {
    if (isBrowser()) {
      const storedBlockTime = localStorage.getItem("blockTime");
      return storedBlockTime ? parseInt(storedBlockTime) : null;
    }
    return null;
  };
  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.toUpperCase();
    setInputValues((prev) => {
      const newInputValues = [...prev];
      newInputValues[index] = value;
      return newInputValues;
    });

    // Move focus to the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`captcha-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
		if (isBlocked) {
			toast({title:"You are blocked. Please try again after 1 minute."});
			return;
		}

		if (inputValues.join("") === correctSequence) {
			toast({title: "You have sucessfully solved this captcha!"});
			const id = createId();
			router.replace(`/verify/${id}`);
		} else {
			const newAttempts = incorrectAttempts + 1;
			setIncorrectAttempts(newAttempts);

			if (newAttempts >= 2) {
				
				fetch("/api/blockUser", { method: "POST", body: JSON.stringify({ id: createId() }) })
					.then(() => {
						const blockTime = Date.now() + 60000; 
						localStorage.setItem("blockTime", blockTime.toString());
						setIsBlocked(true);
						setSeconds(60); 
						toast({title:"You have been blocked for 1 minute."});
						router.replace("/blocked"); 
					})
					.catch((error) => console.error("API Error:", error));
			} else {
				toast({title:"Incorrect, try again!"});
			}
		}
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            DDoS Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-center text-sm text-muted-foreground">
              Select each text box and enter the letter or number you see within
              the circle below
            </p>
            <div className="flex justify-center">
              {captchaChars[currentFocus]==="" ? "Loading..."
              : 
              <div className="bg-primary text-primary-foreground text-xl rounded-full w-20 h-20 flex items-center justify-center overflow-hidden">
                <img src={`${captchaChars[currentFocus]}.jpg`} className="object-cover w-full h-full"/>
              </div>
              }
              
            </div>
            <div className="flex justify-center gap-2">
              {inputValues.map((value, index) => (
                <Input
                  key={index}
                  id={`captcha-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleInputChange(e, index)}
                  onFocus={() => setCurrentFocus(index)}
                  className="w-10 h-10 text-center text-lg"
                  disabled={isBlocked} 
                />
              ))}
            </div>
            <div className="text-center font-bold text-2xl">
              {seconds.toString().padStart(2, "0")}
            </div>
            <Button type="submit" className="w-full">
              {isBlocked ? "Blocked" : "Verify"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}