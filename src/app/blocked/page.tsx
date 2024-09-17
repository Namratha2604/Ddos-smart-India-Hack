"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BlockedPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect back to the main page after 1 minute
    const timer = setTimeout(() => {
      router.push("/"); // Redirect to the main page
    }, 60000); // 1 minute in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center p-8 rounded-lg border border-white/20 backdrop-blur-lg shadow-lg bg-transparent">
        <h1 className="text-white text-2xl mb-4">You are Temporarily Blocked</h1>
        <p className="text-white mb-6">
          You have made too many failed attempts. Please wait for 1 minute before trying again.
        </p>
      </div>
    </div>
  );
};

export default BlockedPage;

