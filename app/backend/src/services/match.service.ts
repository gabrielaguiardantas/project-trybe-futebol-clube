import { Op } from 'sequelize';
import { createMatch } from '../interfaces/createMatch.interface';
import { leaderboardTeamData } from '../interfaces/leaderboardTeamData';
import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';
import TeamService from './team.service';

export default class MatchService {
  public static async findAll(): Promise<MatchModel[]> {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: {
            exclude: ['id'],
          },
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: {
            exclude: ['id'],
          },
        },
      ] });
    return matches;
  }

  public static async updateInProgressById(id: number): Promise<{ message: string } | Error > {
    const [updatedRowCount] = await MatchModel.update({ inProgress: false }, { where: { id } });
    if (updatedRowCount === 1) return { message: 'Finished' };
    throw new Error('Update inProgress unsucessfull!');
  }

  public static async updateById(id: number, body: object): Promise<{ message: string } | Error > {
    const [updatedRowCount] = await MatchModel.update(body, { where: { id } });
    if (updatedRowCount === 1) return { message: 'Finished' };
    throw new Error('Update unsucessfull!');
  }

  public static async create(body: createMatch): Promise<MatchModel> {
    const newMatch = await MatchModel.create({ ...body });
    return newMatch.dataValues;
  }

  public static async leaderboardData(teamId: number, filter?: string): Promise<MatchModel[]> {
    const data = await MatchModel
      .findAll({ raw: true,
        where: {
          [Op.or]: [
            { homeTeamId: teamId },
            { awayTeamId: teamId },
          ],
          inProgress: false } });
    if (filter === 'home') {
      const dataFiltered = data.filter((match) => match.homeTeamId === teamId);
      return dataFiltered;
    }
    if (filter === 'away') {
      const dataFiltered = data.filter((match) => match.awayTeamId === teamId);
      return dataFiltered;
    }
    return data;
  }

  public static async leaderboardTeamData(teamId: number, filter?: string):
  Promise<leaderboardTeamData> {
    const teamData = await this.leaderboardData(teamId, filter);
    const teamResultData = {
      name: (await TeamService.findById(teamId))?.teamName as string,
      totalPoints: (await this.totalPoints(teamData, teamId)).points,
      totalGames: teamData.length,
      totalVictories: (await this.totalPoints(teamData, teamId)).wins,
      totalDraws: (await this.totalPoints(teamData, teamId)).draws,
      totalLosses: (await this.totalPoints(teamData, teamId)).losses,
      goalsFavor: (await this.totalGoals(teamData, teamId)).goalsFavor,
      goalsOwn: (await this.totalGoals(teamData, teamId)).goalsOwn,
      goalsBalance: (await this.totalGoals(teamData, teamId))
        .goalsFavor - (await this.totalGoals(teamData, teamId)).goalsOwn,
      efficiency: (((await this.totalPoints(teamData, teamId))
        .points / (teamData.length * 3)) * 100).toFixed(2),
    };
    return teamResultData;
  }

  private static async totalPoints(teamData: MatchModel[], teamId: number) {
    let points = 0;
    let wins = 0;
    let draws = 0;
    let losses = 0;
    teamData.forEach((match) => {
      if (match.homeTeamId === teamId) {
        if (match.homeTeamGoals > match.awayTeamGoals) { points += 3; wins += 1; return; }
        if (match.homeTeamGoals === match.awayTeamGoals) { points += 1; draws += 1; return; }
        losses += 1;
      } if (match.awayTeamId === teamId) {
        if (match.awayTeamGoals > match.homeTeamGoals) { points += 3; wins += 1; return; }
        if (match.awayTeamGoals === match.homeTeamGoals) { points += 1; draws += 1; return; }
        losses += 1;
      }
    }); return { points, draws, losses, wins };
  }

  private static async totalGoals(teamData: MatchModel[], teamId: number) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    teamData.forEach((match) => {
      if (match.homeTeamId === teamId) {
        goalsFavor += match.homeTeamGoals;
        goalsOwn += match.awayTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        goalsFavor += match.awayTeamGoals;
        goalsOwn += match.homeTeamGoals;
      }
    });
    return { goalsFavor, goalsOwn };
  }
}
