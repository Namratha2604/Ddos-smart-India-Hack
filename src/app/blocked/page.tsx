"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BlockedPage = () => {
  const router = useRouter();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const blockTime = localStorage.getItem("blockTime");
    const endTime = blockTime ? parseInt(blockTime) : Date.now() + 60000;

    const timer = setInterval(() => {
      const remainingTime = Math.floor((endTime - Date.now()) / 1000);
      if (remainingTime > 0) {
        setSeconds(remainingTime);
      } else {
        clearInterval(timer);
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

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