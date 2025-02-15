import { useEffect, useRef, useState } from "react";

export function useStopwatch() {
  const timeRef = useRef(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isRunning || !timeRef) return;

    const interval = setInterval(() => {
      if (timeRef) {
        timeRef.current = timeRef.current + 1000;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getTime = () => {
    return timeRef.current;
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const resetStopwatch = () => {
    timeRef.current = 0;
    setIsRunning(true);
  };

  return {
    getTime,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
  };
}
