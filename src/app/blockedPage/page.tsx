"use client"; 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

const BlockedPage = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(60); 

  useEffect(() => {
    
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        router.push('/'); 
      }
    }, 1000); 

    
    return () => clearInterval(timer);
  }, [seconds, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center p-8 rounded-lg border border-white/20 backdrop-blur-lg shadow-lg bg-transparent">
        <h1 className="text-white text-2xl mb-4">You are temporarily blocked</h1>
        <p className="text-white mb-6">
          
          You have exceeded the maximum number of attempts. <br />
          You will be redirected to the homepage in {seconds} sec.
        </p>
      </div>
    </div>
  );
};

export default BlockedPage;
