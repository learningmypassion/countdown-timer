"use client"; // This should be at the top//

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Home() {
  return (
    <div className="bg-[lightgray] h-[100vh] flex justify-center items-center">
      <CountdownTimer />
    </div>
  );
}

function CountdownTimer() {
  //------------------------  variables --------------------------
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  //------------------------  Timeformat --------------------------
  const timeformat = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  //------------------------  Set Button --------------------------
  const setBtn = () => {
    const parsedDuration = typeof duration === "string" ? Number(duration) : duration;
    if (parsedDuration > 0) {
      setTimeLeft(parsedDuration);
    }
  };

  //------------------------  Start Button --------------------------
  const startBtn = () => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  };

  //------------------------ Pause Button --------------------------
  const pauseBtn = () => {
    setIsActive(false);
  };

  //------------------------ Reset Button --------------------------
  const resetBtn = () => {
    setIsActive(false);
    setTimeLeft(0);
    setDuration("");
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timer.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer.current!);
      setIsActive(false);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [isActive, timeLeft]);

  return (
    <div className="h-[400px] w-[600px] bg-[#ededed] rounded-[16px] border-[1px] border-[gray] text-[black] flex justify-center items-center flex-col">
      <h1 className="text-[30px] font-bold">Countdown Timer</h1>
      <div className="flex gap-[10px] mt-[10px]">
        <Input
          className="w-[200px]"
          placeholder="Enter duration in seconds"
          type="number"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />
        <Button
          onClick={setBtn}
        >
          Set
        </Button>
      </div>

      <div className="text-[65px] font-[600]">{timeformat(timeLeft)}</div>

      <div className="flex gap-[30px]">
        <Button onClick={startBtn}>Start</Button>
        <Button onClick={pauseBtn}>Pause</Button>
        <Button onClick={resetBtn}>Reset</Button>
      </div>
    </div>
  );
}