import React, { useState } from "react";
import axios from "axios";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

import VoiceModelSelector from "@/components/VoiceModelSelector";

const TtsRequestForm = ({}) => {
  const [voiceId, setVoiceId] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleConvert = async () => {
    if (voiceId && text.trim()) {
      setLoading(true);
      try {
        await axios.post("/api/tts", {
          voiceId,
          text,
        });
        setText("");
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error converting text to speech",
          description: "Failed to convert text to speech on server.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error converting text to speech",
        description: "Please select a voice and/or provide text.",
      });
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <VoiceModelSelector onChange={(modelId: number) => setVoiceId(modelId)} />
      <p className="pb-2 font-medium">Input Text</p>
      <Textarea onChange={handleTextChange} value={text} />
      <Button
        className="self-end mt-6"
        onClick={handleConvert}
        disabled={loading}
      >
        {loading && <Spinner size="small" className="text-white" />}
        Convert
      </Button>
    </>
  );
};

export default TtsRequestForm;
