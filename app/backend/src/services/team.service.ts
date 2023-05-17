import TeamModel from '../database/models/team.model';

export default class TeamService {
  public static async findAll(): Promise<TeamModel[]> {
    const teams = await TeamModel.findAll();
    console.log(teams);
    return teams;
  }

  public static async findById(id: number): Promise<TeamModel | null> {
    const team = await TeamModel.findByPk(id);
    return team;
  }
}
