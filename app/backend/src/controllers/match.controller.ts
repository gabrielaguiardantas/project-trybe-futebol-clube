import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async findAll(req: Request, res: Response) {
    if (req.query.inProgress === 'true') {
      const matchesFiltered = await MatchService.findAll();
      return res.status(200).json(matchesFiltered.filter((match) => match.inProgress === true));
    }
    if (req.query.inProgress === 'false') {
      const matchesFiltered = await MatchService.findAll();
      return res.status(200).json(matchesFiltered.filter((match) => match.inProgress === false));
    }
    const matches = await MatchService.findAll();
    return res.status(200).json(matches);
  }

  static async updateInProgressById(req: Request, res: Response) {
    const { id } = req.params;
    const updatedMatch = await MatchService.updateInProgressById(Number(id));
    return res.status(200).json(updatedMatch);
  }

  static async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const updatedMatch = await MatchService.updateById(Number(id), body);
    return res.status(200).json(updatedMatch);
  }

  static async create(req: Request, res: Response) {
    const newMatch = await MatchService.create(req.body);
    return res.status(201).json(newMatch);
  }
}
