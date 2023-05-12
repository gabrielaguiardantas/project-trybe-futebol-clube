import { NextFunction, Request, Response } from 'express';

const verifyLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const validRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!req.body.email || !req.body.password) {
    return res
      .status(400).json({ message: 'All fields must be filled' });
  }
  if (req.body.email.match(validRegex) === null || req.body.password.length < 6) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }
  next();
};

export default verifyLoginFields;
