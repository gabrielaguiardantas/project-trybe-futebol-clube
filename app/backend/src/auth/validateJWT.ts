import jwt = require('jsonwebtoken');
import { NextFunction, Response } from 'express';
import Token from '../interfaces/token.interface';
import UserService from '../services/user.service';
import { RequestWithUserRole } from '../interfaces/requestWithUserRole.interface';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const validateJWT = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  try {
    const decoded = <Token>jwt.verify(token, secret);
    const user = await UserService.findByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateJWT;
