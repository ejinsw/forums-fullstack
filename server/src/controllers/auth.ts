import { Request, Response } from 'express';

export const register = (req: Request, res: Response) => {
  // Registration logic
  res.send('User registered');
};

export const login = (req: Request, res: Response) => {
  // Login logic
  res.send('User logged in');
};