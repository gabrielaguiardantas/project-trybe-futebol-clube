import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

const verifyMatchFields = async (req: Request, res: Response, next: NextFunction) => {
  if (!await TeamService.findById(Number(req.body.homeTeamId))
  || !await TeamService.findById(Number(req.body.awayTeamId))) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  if (req.body.homeTeamId === req.body.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export default verifyMatchFields;
