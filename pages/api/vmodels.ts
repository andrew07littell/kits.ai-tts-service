import { getVoiceModels } from "@/lib/data";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getVoiceModels();
      res.status(200).json(data.data);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to process the text-to-speech request." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
