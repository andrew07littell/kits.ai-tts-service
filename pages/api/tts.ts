import { ttsConvert, getTtsStatus } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await ttsConvert(req.body.voiceId, req.body.text);
      res.status(200).json(response.data);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to process the text-to-speech request." });
    }
  } else if (req.method === "GET") {
    const response = await getTtsStatus();
    res.status(200).json(response.data);
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
