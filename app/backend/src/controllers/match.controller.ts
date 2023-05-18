import { Request, Response } from 'express';
import { leaderboardTeamData } from '../interfaces/leaderboardTeamData';
import MatchService from '../services/match.service';
import TeamService from '../services/team.service';

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

  static async leaderboardHome(_req: Request, res: Response) {
    const teams = await TeamService.findAll();
    const result = await Promise
      .all(teams.map((team) => MatchService.leaderboardTeamData(team.id, 'home')));
    const resultOrdered = MatchController.correctSortLeaderboard(result);
    return res.status(200).json(resultOrdered);
  }

  static async leaderboardAway(_req: Request, res: Response) {
    const teams = await TeamService.findAll();
    const result = await Promise
      .all(teams.map((team) => MatchService.leaderboardTeamData(team.id, 'away')));
    const resultOrdered = MatchController.correctSortLeaderboard(result);
    return res.status(200).json(resultOrdered);
  }

  static async leaderboard(_req: Request, res: Response) {
    const teams = await TeamService.findAll();
    const result = await Promise
      .all(teams.map((team) => MatchService.leaderboardTeamData(team.id)));
    const resultOrdered = MatchController.correctSortLeaderboard(result);
    return res.status(200).json(resultOrdered);
  }

  private static correctSortLeaderboard(result: leaderboardTeamData[]): leaderboardTeamData[] {
    return result
      .sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
  }
}
