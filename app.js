import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Assuming CORS handling is needed, make sure to install it
import { generateResponse } from './src/controllers/index.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Enable CORS if your frontend is on a different origin
app.use(express.json()); // Parse JSON bodies

// POST endpoint
app.post('/api/fileUpload',cors(), generateResponse);


// Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong on the server!');
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
