import { Request } from 'express';
import Token from './token.interface';

export interface RequestWithUserRole extends Request {
  user?: Token,
}
