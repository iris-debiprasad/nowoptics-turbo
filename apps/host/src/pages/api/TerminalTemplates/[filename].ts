import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

export default async function api(req: NextApiRequest, res: NextApiResponse) {
  const fileName = req.query.filename;
  if (req.method === "GET") {
    const filePath =
      fileName === "SMSOptInConfirmation"
        ? "/TerminalTemplates/SMSOptInConfirmation.html"
        : `/TerminalTemplates/${fileName}.htm`;
    try {
      const dir = path.join(process.cwd(), "public", filePath);
      const { size } = fs.statSync(dir);

      res.writeHead(200, {
        "Content-Type": "text/html",
        "Content-Length": size,
      });

      const readStream = fs.createReadStream(dir);

      await new Promise(function (resolve) {
        readStream.pipe(res);

        readStream.on("end", resolve);
      });
    } catch (error) {
      res.status(404).send("Page not found");
    }
  }
}
