import React, { useEffect, useRef, useState, memo } from "react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import DownloadIcon from "@/public/svg/download-minimalistic-svgrepo-com.svg";
import PlayIcon from "@/public/svg/play-svgrepo-com.svg";
import PauseIcon from "@/public/svg/pause-svgrepo-com.svg";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        let percentage = (audio.currentTime / audio.duration) * 100;
        setProgress(percentage);
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", () => {
        setPlaying(false);
        setProgress(0);
      });
      return () => audio.removeEventListener("timeupdate", updateProgress);
    }
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio !== null) {
      if (playing) {
        audio.pause();
      } else {
        audio.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="flex items-center space-x-2 my-2">
      <audio ref={audioRef} src={audioUrl} />
      <Button
        variant="outline"
        className="p-1.5 w-8 h-8"
        onClick={togglePlayPause}
      >
        <Image
          src={playing ? PauseIcon : PlayIcon}
          alt="Download"
          width={20}
          height={20}
        />
      </Button>
      <Progress value={progress} className="h-2" />
      <a href={audioUrl} download>
        <Button variant="outline" className="p-2 w-8 h-8">
          <Image src={DownloadIcon} alt="Download" width={20} height={20} />
        </Button>
      </a>
    </div>
  );
};

export default memo(AudioPlayer);
