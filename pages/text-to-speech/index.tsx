import * as React from "react";
import TtsRequestForm from "@/pages/text-to-speech/components/TtsRequestForm";
import LastConversions from "@/pages/text-to-speech/components/LastConversions";

export default function Home() {
  return (
    <div className="container py-8 px-32">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-8">
          Kits AI Text-to-speech
        </h1>
        <span className="text-2xl w-2/3 text-center">
          Play with unique AI voice models, languages, and pitch without the
          need for voice actors, microphones, or recordings
        </span>
      </div>
      <div className="p-4 flex gap-12 items-start">
        <div className="flex flex-col border-2 border-solid rounded-xl p-6 w-1/2">
          <p className="text-xl font-bold mb-2">Text to speech</p>
          <p className="text-md text-slate-500">
            Select a voice and provide text to generate speech.
          </p>
          <TtsRequestForm />
        </div>
        <div className="flex flex-col border-2 border-solid rounded-xl p-6 w-1/2">
          <p className="text-xl font-bold mb-2">Outputs</p>
          <p className="text-md text-slate-500">
            This section will show your last 5 conversions.
          </p>
          <LastConversions />
        </div>
      </div>
    </div>
  );
}
