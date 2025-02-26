import { NextApiRequest, NextApiResponse } from "next";

// Use a global variable to store visits
let visitCount = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    visitCount += 1; // Increment visits globally
    res.status(200).json({ visits: visitCount });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
