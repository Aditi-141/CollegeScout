const express = require('express');
const bodyParser = require('parser');
const dotenv = require('dotenv');
const {generateResponse} = require('./controllers/index.ts');


// import bodyParser from "body-parser";
// import dotenv from "dotenv";
//import { generateResponse } from "./controllers";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.post("/generate", generateResponse);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
