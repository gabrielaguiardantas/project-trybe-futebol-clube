import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async findAll(_req: Request, res: Response) {
    const matches = await MatchService.findAll();
    return res.status(200).json(matches);
  }

  // static async findById(req: Request, res: Response) {
  //   const team = await TeamService.findById(Number(req.params.id));
  //   return res.status(200).json(team);
  // }
}
