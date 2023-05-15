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
}
