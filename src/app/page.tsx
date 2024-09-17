"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createId } from "crypto-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function generateRandomChar() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function generateCaptchaChars() {
  return Array.from({ length: 6 }, generateRandomChar);
}

export default function VerificationPage() {
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));
  const [captchaChars, setCaptchaChars] = useState<string[]>(
    generateCaptchaChars()
  );
  const [currentFocus, setCurrentFocus] = useState(0);
  const [seconds, setSeconds] = useState(() => {
    const storedSeconds = localStorage.getItem("seconds");
    return storedSeconds ? parseInt(storedSeconds) : 59;
  });

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          localStorage.setItem("seconds", (prevSeconds - 1).toString());
          return prevSeconds - 1;
        }
        clearInterval(timerInterval);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

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
    const correctSequence = captchaChars.join("");
    if (inputValues.join("") === correctSequence) {
      toast({
        title: "Verification Successful",
        description: "You have successfully solved the captcha.",
      });
      const id = createId(52);
      router.replace(`/verify/${id}`);
    } else {
      toast({
        title: "Verification Failed",
        description: "Incorrect captcha. Please try again.",
        variant: "destructive",
      });
      setInputValues(Array(6).fill(""));
      setCaptchaChars(generateCaptchaChars());
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
              <div className="bg-primary text-primary-foreground text-xl rounded-full w-12 h-12 flex items-center justify-center">
                {captchaChars[currentFocus]}
              </div>
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
                />
              ))}
            </div>
            <div className="text-center font-bold text-2xl">
              {seconds.toString().padStart(2, "0")}
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
