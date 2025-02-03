import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const POSITIONSTACK_API_KEY = process.env.POSITIONSTACK_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { location } = req.query;
  if (!location) return res.status(400).json({ error: "Location required" });

  try {
    const { data } = await axios.get(`http://api.positionstack.com/v1/forward`, {
      params: { access_key: POSITIONSTACK_API_KEY, query: location },
    });

    res.status(200).json({ coordinates: data.data[0] });
  } catch (error) {
    res.status(500).json({ error: "Geolocation failed" });
  }
}
