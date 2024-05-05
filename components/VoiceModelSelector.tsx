import { useEffect, useState } from "react";

import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VoiceModel = {
  id: number;
  title: string;
};

interface VoiceModelSelectorProps {
  onChange: (modelId: number) => void;
}

export default function VoiceModelSelector({
  onChange,
}: VoiceModelSelectorProps) {
  const [voiceModels, setVoiceModels] = useState<VoiceModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vmodels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVoiceModels(data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full pt-4 pb-6">
      <p className="pb-2 font-medium">Voice Model</p>
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        <Select onValueChange={(value) => onChange(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Select a voice model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {voiceModels.map((model) => (
                <SelectItem key={model.id} value={model.id.toString()}>
                  {model.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
