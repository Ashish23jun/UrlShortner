import express from 'express';
import dotenv from 'dotenv';
import route from './routes/urlRoutes.js';
import connectDB from './config/ConnectDB.js';
import Url from './models/url.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000; // Set default port if not specified

// Middleware to parse JSON request body
app.use(express.json());

// Use the URL routes
app.use('/url', route);

// Redirect Route for Short URLs
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;

  try {
    // Find the URL entry by the shortId and update visitHistory
    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true } // Ensures the updated document is returned
    );

    // Check if the entry exists
    if (!entry) {
      return res.status(404).json({ message: 'URL not found' });
    }

    // Redirect to the original URL
    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error('Error while redirecting:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
