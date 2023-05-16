import { createMatch } from '../interfaces/createMatch.interface';
import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';

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
}
