import pkg from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./database.js";

dotenv.config();

const app = pkg();
app.use(cors());
const configuration = new GoogleGenerativeAI(process.env.API_KEY); // GoogleGenerativeAI required config
const modelId = "gemini-pro"; // Model initialization
const model = configuration.getGenerativeModel({ model: modelId });
const conversationContext = [];
const currentMessages = [];

/**
 * A function to generate reponse for the question asked
 * * @param {*} req a param that receives the json of text file uploaded
 * * @param {*} res a param that send the outcome such as name and program of student
 *
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  });
};

/**
 * @param {object} req - Express request object, containing the user's prompt in req.body.
 * @param {object} res - Express response object used to send the final response with extracted information.
 */
const generateResponse = catchAsync(async (req, res) => {
  let { prompt } = req.body;
  const chatConfig = {
    history: currentMessages.concat(
      conversationContext.flatMap(([inputText, responseText]) => [
        {
          role: "user",
          content: { text: inputText },
        },
        { role: "model", content: { text: responseText } },
      ])
    ),
    generationConfig: { maxOutputTokens: 100 },
  };

  const chat = model.startChat(chatConfig);
  let keyprompt =
    "what is the keywords from this sop? Give in array format. " + prompt;
  let result = await chat.sendMessage(keyprompt);
  const keywords = result.response.text();
  prompt =
    'what is the persons name and the program they are applying to? Provide in the format {"Name": "<name>", "Program Applying To": " <program>"}.' +
    prompt;
  result = await chat.sendMessage(prompt);
  const responseText = result.response.text();
  const nameMatch = responseText.match(/"Name":\s*"([^"]*)"/);
  const programMatch = responseText.match(/"Program Applying To":\s*"([^"]*)"/);
  if (!nameMatch || !programMatch) {
    return res
      .status(400)
      .send("Could not extract name or program from the response");
  }
  const name = nameMatch[1].trim();
  const program = programMatch[1].trim();
  //await insertStudent(name, program); // Ensure await here
  const colleges = await getColleges(program, keywords);
  res.json({ response: { name, program, colleges,} });
});

/**
 * @param {*} interestedProgram contains users program they want to apply forcontains main keywords written by the user in the SOP
 * @param {*} sopKeywordString 
 * @returns 
 */

const getColleges = async (interestedProgram, sopKeywordString) => {
  try {
    let sopKeywords = sopKeywordString
      .split("\n")
      .map((keyword) => keyword.trim().substring(1).trim().toLowerCase());
    const interestedProgramKeywords = interestedProgram
      .toLowerCase()
      .split(" ")
      .filter((kw) => kw !== "program"); // Fetch all colleges and their programs
    let college = await pool.query(
      `       SELECT c.*       FROM college c     `
    );
    const objectToString = (obj) => {
      return Object.entries(obj)
        .map(([key, value]) => {
          // If the value is an array, join its elements into a string
          if (Array.isArray(value)) {
            return `${key}: ${value.join(", ")}`;
          }
          // For other types of values, just include them as is
          return `${key}: ${value}`;
        })
        .join(", ");
    };
    // Convert each college object to a string using the objectToString function
    const collegeDetails = college.rows.map(objectToString).join("; ");
    const chatConfig = {
      history: currentMessages.concat(
        conversationContext.flatMap(([inputText, responseText]) => [
          { role: "user", content: { text: inputText } },
          { role: "model", content: { text: responseText } },
        ])
      ),
      generationConfig: { maxOutputTokens: 100 },
    };
    const chat = model.startChat(chatConfig);
    let keyprompt =
      "This is the colleges attributes present in database: " +
      collegeDetails +
      " and these are SOP key words = " +
      sopKeywords +
      '. Give the names of the colleges that match the most with the keywords, similarity percentage more than 0%, and a detailed description in 1-2 line of each college related to the SOP. Give the output in array format i.e [{"collegeName": "<name>", "similarity": "<similarity percentage>", "description": "<detailed description>"},...] in descending order of similarity. Dont aadd empty space' ;
    let chatresult = await chat.sendMessage(keyprompt);
    let keywords = chatresult.response.text();
    if (typeof keywords === 'string') {
        keywords = JSON.parse(keywords);  // Only parse if it's a string
    }
    
    return keywords;
  } catch (err) {
    console.error("Error fetching matching colleges:", err);
    throw err; // Propagate error to be caught by the calling function
  }
};

export { generateResponse as generateResponse };
