import { generateResponse } from '../dist/controllers/index';
import pool from '../dist/model/database';

jest.mock('@google/generative-ai');
jest.mock('../model/database');

test('should extract keywords and name/program from SOP', async () => {
  const mockRequest = { body: { prompt: 'I want to study AI at MIT.' } };
  const mockResponse = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  const mockNext = jest.fn();

  await generateResponse(mockRequest, mockResponse, mockNext);

  expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
    response: expect.objectContaining({
      name: expect.any(String),
      program: expect.any(String),
      colleges: expect.any(Array),
    })
  }));
});

test('should handle database query correctly', async () => {
  pool.query.mockResolvedValue({ rows: [{ name: 'MIT', program: 'AI' }] });

  const result = await getColleges('AI', 'artificial intelligence');
  expect(result).toEqual(expect.any(Array));
});
