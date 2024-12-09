import express from 'express';
import { createShortUrl } from '../controllers/urlController.js';

const router = express.Router();

// POST route for creating short URL
router.post('/', createShortUrl);

export default router;
