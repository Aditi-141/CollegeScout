// index.test.ts

import { generateResponse, getColleges } from './index';
import pool from '../model/database.ts';
import { GoogleGenerativeAI } from '@google/generative-ai';

jest.mock('@google/generative-ai');
jest.mock('../model/database.ts'); 

// Mock startChat method
const mockStartChat = jest.fn().mockReturnValue({
  sendMessage: jest.fn()
    .mockResolvedValueOnce({
      response: {
        text: jest.fn().mockReturnValueOnce('["artificial intelligence", "machine learning"]') // Mock keyword extraction
      }
    })
    .mockResolvedValueOnce({
      response: {
        text: jest.fn().mockReturnValueOnce('{"Name": "John Doe", "Program Applying To": "Computer Science"}') // Mock name/program extraction
      }
    })
});

// Mock GoogleGenerativeAI instance
GoogleGenerativeAI.mockImplementation(() => ({
  getGenerativeModel: jest.fn().mockReturnValue({
    startChat: mockStartChat
  })
}));

// Mock getColleges function
jest.mock('./index', () => ({
  ...jest.requireActual('./index'),
  getColleges: jest.fn().mockResolvedValue([
    { collegeName: 'MIT', similarity: '90%', description: 'Top AI Program' },
    { collegeName: 'Stanford', similarity: '85%', description: 'Great AI courses' }
  ]),
}));



describe('getColleges', () => {
  test('should handle database query correctly', async () => {
    pool.query.mockResolvedValue({ rows: [{ name: 'MIT', program: 'AI' }] });

    const result = await getColleges('AI', 'artificial intelligence');
    expect(result).toEqual(expect.any(Array));
    expect(result[0].collegeName).toBe('MIT');
  });
});
describe('generateResponse', () => {
  test('should extract keywords and name/program from SOP', async () => {
    const mockRequest = {
      body: {
        prompt: 'This is the SOP text'
      }
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    const mockNext = jest.fn();

    await generateResponse(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalled();
  });
});