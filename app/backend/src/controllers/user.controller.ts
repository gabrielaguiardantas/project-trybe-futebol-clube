import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { RequestWithUserRole } from '../interfaces/requestWithUserRole.interface';
import UserService from '../services/user.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const validLogin = await UserService.findByLogin(req.body.email, req.body.password);
    if (validLogin.user) {
      const payload = {
        email: req.body.email,
        id: validLogin.user.id,
        admin: false };
      const token = jwt.sign(payload, 'jwt_secret', { expiresIn: '1d' });
      return res.status(200).json({ token });
    }
    return res.status(401).json(validLogin.json);
  }

  static async role(req: RequestWithUserRole, res: Response) {
    return res.status(200).json({ role: req.user?.role });
  }
}
