import axios from "axios";

export function getVoiceModels() {
  return axios.get("https://arpeggi.io/api/kits/v1/voice-models", {
    headers: {
      Authorization: `Bearer ${process.env.KITS_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
}

export function ttsConvert(voiceId: number, text: string) {
  return axios.post(
    "https://arpeggi.io/api/kits/v1/tts",
    {
      voiceModelId: voiceId,
      inputTtsText: text,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.KITS_AI_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function getTtsStatus() {
  return axios.get("https://arpeggi.io/api/kits/v1/tts", {
    headers: {
      Authorization: `Bearer ${process.env.KITS_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    params: {
      perPage: 5,
    },
  });
}
