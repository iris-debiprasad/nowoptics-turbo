import { NextApiRequest, NextApiResponse } from "next";

export default function api(req: NextApiRequest, res: NextApiResponse) {
  res.send(`User-agent: *
    Disallow: /my-account
    Disallow: /cart
    Sitemap: https://www.stantonoptical.com/sitemap.xml`); // Send your `robots.txt content here
}