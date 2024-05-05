import * as React from "react";
import { Button } from "@/components/ui/button";

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
      <div className="p-4 flex gap-12 justify-center">
        <a className="w-1/2 text-center" href="/text-to-speech">
          <Button className="w-full">Text to speech</Button>
        </a>
      </div>
    </div>
  );
}
