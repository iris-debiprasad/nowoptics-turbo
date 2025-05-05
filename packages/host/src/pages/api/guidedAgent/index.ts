// pages/api/updateData.js

import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const updatedData = req.body;

    const filePath = path.join(process.cwd(), "public", "meeting.json");

    try {
      const jsonContent = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(jsonContent);

      const newData = { ...data, ...updatedData };

      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

      res.status(200).json({ message: "Data updated successfully", newData });
    } catch (err) {
      res.status(500).json({ message: "Failed to update data" });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
