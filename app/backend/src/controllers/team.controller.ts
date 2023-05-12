import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async findAll(_req: Request, res: Response) {
    const teams = await TeamService.findAll();
    return res.status(200).json(teams);
  }

  static async findById(req: Request, res: Response) {
    const team = await TeamService.findById(Number(req.params.id));
    return res.status(200).json(team);
  }
}
