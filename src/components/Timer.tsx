import { useState, useEffect, useCallback } from "react";
import LapList from "./LapList";
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";

import "./timer.css";

const Timer = () => {
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);

  const formatTime = useCallback(() => {
    const amountMillisecondsIn1Minute = 60000;
    const minutes = `0${
      Math.floor(milliseconds / amountMillisecondsIn1Minute) % 60
    }`.slice(-2);

    const amountMillisecondsIn1Second = 1000;
    const seconds = `0${
      Math.floor(milliseconds / amountMillisecondsIn1Second) % 60
    }`.slice(-2);

    const amountMillisecondsIn1Centisecond = 10;
    const centiseconds = `0${
      Math.floor(milliseconds / amountMillisecondsIn1Centisecond) % 100
    }`.slice(-2);

    return `${minutes}:${seconds}:${centiseconds}`;
  }, [milliseconds]);

  const resetTime = useCallback(() => {
    setMilliseconds(0);
    setTimerOn(false);
    setLaps([]);
  }, []);

  const startTimer = useCallback(() => {
    return setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 10);
    }, 10);
  }, []);

  const stopTimer = useCallback((interval: ReturnType<typeof setInterval>) => {
    clearInterval(interval);
    return interval;
  }, []);

  const addLap = useCallback(() => {
    setLaps([formatTime(), ...laps]);
  }, [formatTime, setLaps, laps]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerOn === true) {
      interval = startTimer();
    } else if (!timerOn && interval) {
      interval = stopTimer(interval);
    }

    return () => {
      if (interval) {
        stopTimer(interval);
      }
    };
  }, [timerOn, startTimer, stopTimer]);

  return (
    <main className="timer-container">
      <TimerDisplay time={formatTime()} />
      <TimerControls
        onStart={() => setTimerOn(true)}
        onStop={() => setTimerOn(false)}
        timerOn={timerOn}
        onReset={() => resetTime()}
        onLap={addLap}
      />
      <LapList laps={laps.reverse()} />
    </main>
  );
};

export default Timer;
