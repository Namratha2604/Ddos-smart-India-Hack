"use client";
import { Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Component() {
  const [currAnswer, setCurrAnswer] = useState("");
  const [hiddenId, setHiddenId] = useState("");
  const [antiPhishingAnswerArray, setAntiPhishingAnswerArray] = useState<
    string[]
  >([]);
  const { toast } = useToast();
  const pathName = usePathname();
  const id = pathName.split("/verify/")[1];
  const idArray = id.split("");
  const router = useRouter();
  //   const antiPhishingAnswerArray: Array<string> = [];

  useEffect(() => {
    const randomIndices = new Set<number>();
    while (randomIndices.size < 6) {
      const randomIndex = Math.floor(Math.random() * idArray.length);
      randomIndices.add(randomIndex);
    }
    const randomIndicesArray = Array.from(randomIndices);
    randomIndicesArray.sort((a, b) => a - b);

    const tempAntiPhishingAnswerArray: string[] = [];

    randomIndicesArray.forEach((index) => {
      tempAntiPhishingAnswerArray.push(idArray[index]);
      idArray[index] = "*";
    });

    const tempId = idArray.join("");
    setHiddenId(tempId);

    setAntiPhishingAnswerArray(tempAntiPhishingAnswerArray);
  }, []);

  const antiPhishingAnswer = antiPhishingAnswerArray.join("");

  function checkAnswer() {
    if (currAnswer === antiPhishingAnswer) {
      toast({
        title: "Success",
        description: "Correct code entered!",
      });
      router.push("/login");
    } else {
      toast({
        title: "Incorrect code",
        description: "The code you entered is incorrect.",
        variant: "destructive"
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-neutral-950">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Shield className="mr-2 h-6 w-6" />
            Anti-Phishing
          </CardTitle>
          <div className="text-sm font-medium">DDOS Protection</div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-md mb-4 font-mono text-sm">
            Check the URL in the address bar for the 6 missing characters
            <h1>{hiddenId}</h1>
          </div>
          <div className="space-y-4">
            <div className="font-medium">Enter the 6 missing * characters</div>
            <Input
              value={currAnswer}
              onChange={(e) => setCurrAnswer(e.target.value)}
              type="text"
              placeholder="Enter characters"
              className="w-full"
            />
            <Button
              className="w-full bg-green-500 hover:bg-green-600"
              onClick={checkAnswer}
            >
              Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
