import React, { memo, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface AnimatedProgressProps {
  running: boolean;
}

const AnimatedProgress = ({ running }: AnimatedProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 99) {
            setIncreasing(false);
          }
          if (prevProgress <= 1) {
            setIncreasing(true);
          }
          return increasing ? prevProgress + 2 : prevProgress - 2;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [running, increasing]);

  return <Progress value={progress} className="h-2" />;
};

export default memo(AnimatedProgress);
