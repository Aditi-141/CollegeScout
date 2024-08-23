import express, { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";
import pool from "../model/database"; // Assuming it's already in TypeScript

dotenv.config();

const app = express();
app.use(cors());

const configuration = new GoogleGenerativeAI(process.env.API_KEY as string); // Ensure API key is a string
const modelId = "gemini-pro"; // Model initialization
const model = configuration.getGenerativeModel({ model: modelId });
const conversationContext: Array<[string, string]> = [];
const currentMessages: Array<{ role: string; content: { text: string } }> = [];

/**
 * A higher-order function that catches async errors.
 * 
 * @param fn - The async function to be wrapped with error handling.
 * @returns A wrapped function with error handling.
 */
const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  });
};

/**
 * Generates a response for the user's uploaded SOP by extracting keywords and matching with colleges.
 * @param req - Express request object, containing the user's prompt in req.body.
 * @param res - Express response object used to send the final response with extracted information.
 */
const generateResponse = catchAsync(async (req: Request, res: Response) => {
  const { prompt }: { prompt: string } = req.body; // Destructure prompt from request body
  
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
  
  // Generate keywords from SOP
  let keyprompt = "what are the keywords from this SOP? Give in array format. " + prompt;
  let result = await chat.sendMessage(keyprompt);
  const keywords = result.response.text();

  // Extract name and program from SOP
  const nameProgramPrompt = 'what is the person’s name and the program they are applying to? Provide in the format {"Name": "<name>", "Program Applying To": "<program>"}.' + prompt;
  result = await chat.sendMessage(nameProgramPrompt);
  const responseText = result.response.text();
  
  // Extract name and program from the AI response
  const nameMatch = responseText.match(/"Name":\s*"([^"]*)"/);
  const programMatch = responseText.match(/"Program Applying To":\s*"([^"]*)"/);
  
  if (!nameMatch || !programMatch) {
    return res.status(400).send("Could not extract name or program from the response");
  }
  
  const name = nameMatch[1].trim();
  const program = programMatch[1].trim();

  const colleges = await getColleges(program, keywords);
  res.json({ response: { name, program, colleges } });
});

/**
 * Fetches colleges from the database and matches them to the user's SOP keywords.
 * @param interestedProgram - The program the user is interested in.
 * @param sopKeywordString - The keywords extracted from the SOP.
 * @returns A promise resolving to a list of matching colleges with similarity scores and descriptions.
 */
const getColleges = async (interestedProgram: string, sopKeywordString: string) => {
  try {
    // Parse SOP keywords and the interested program
    let sopKeywords = sopKeywordString
      .split("\n")
      .map((keyword) => keyword.trim().substring(1).trim().toLowerCase());

    const interestedProgramKeywords = interestedProgram
      .toLowerCase()
      .split(" ")
      .filter((kw) => kw !== "program");

    // Query the database for colleges
    let college = await pool.query("SELECT c.* FROM college c");
    
    // Helper function to convert a college object to string
    const objectToString = (obj: any): string => {
      return Object.entries(obj)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(", ")}`;
          }
          return `${key}: ${value}`;
        })
        .join(", ");
    };

    // Convert each college object to a string for matching
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
    
    let keyprompt = `These are the college attributes in the database: ${collegeDetails} and these are SOP keywords: ${sopKeywords}. Provide a list of colleges that match the most with the keywords, similarity percentage, and a brief description for each college. Output in array format.`;
    
    let chatresult = await chat.sendMessage(keyprompt);
    let keywords = chatresult.response.text();
    
    if (typeof keywords === "string") {
      keywords = JSON.parse(keywords);  // Parse only if it's a string
    }

    return keywords;
  } catch (err) {
    console.error("Error fetching matching colleges:", err);
    throw err;
  }
};

export { generateResponse };
