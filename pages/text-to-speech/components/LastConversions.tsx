import React, { useEffect, useState } from "react";
import axios from "axios";

import StatusListItem from "../../../components/StatusListItem";
import { useToast } from "@/components/ui/use-toast";

type TtsStatus = {
  id: number;
  createdAt: string;
  type: string;
  status: string;
  voiceModelId: number;
  jobStartTime: string;
  jobEndTime: string;
  outputFileUrl: string;
  model: {
    id: number;
    title: string;
  };
};

const LastConversions = () => {
  const [ttsStatus, setTtsStatus] = useState<TtsStatus[]>([]);
  const { toast } = useToast();

  const updateTtsStatus = async () => {
    try {
      const response = await axios.get("/api/tts");
      const newStatus = response.data.data;
      setTtsStatus((_ttsStatus) =>
        newStatus.map((status: TtsStatus) => {
          const prevStatus = _ttsStatus?.find(
            (ts: TtsStatus) => ts.id === status.id
          );
          if (prevStatus?.outputFileUrl)
            status.outputFileUrl = prevStatus.outputFileUrl;
          return status;
        })
      );
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error updating TTS status",
        description: "Failed to update TTS status on server.",
      });
    }
  };

  useEffect(() => {
    updateTtsStatus();
    setInterval(async () => {
      updateTtsStatus();
    }, 3000);
  }, []);

  return (
    <>
      {ttsStatus.map((status: TtsStatus) => {
        return (
          <StatusListItem
            key={status.id}
            status={status.status}
            title={status.model.title}
            createdAt={status.createdAt}
            jobStartTime={status.jobStartTime}
            jobEndTime={status.jobEndTime}
            outputFileUrl={status.outputFileUrl}
          />
        );
      })}
    </>
  );
};

export default LastConversions;
