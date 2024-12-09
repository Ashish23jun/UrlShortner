import { nanoid } from 'nanoid';
import Url from '../models/url.js';

const createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'Long URL is required' });
  }

  const shortId = nanoid(6); // Generate a 6-character unique short ID

  await Url.create({
    shortId: shortId,
    redirectUrl: url,
    visitHistory: [],
  });

  return res.status(201).json({ shortId });
};

export { createShortUrl };
