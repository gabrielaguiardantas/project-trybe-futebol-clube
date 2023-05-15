import MatchModel from './match.model';
import TeamModel from './team.model';

(async () => {
  // const matches = await MatchModel.findAll({ raw: true });
  // console.table(matches);

  const matchesIncludeTeams = await MatchModel
    .findAll({
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
  console.log(JSON.stringify(matchesIncludeTeams, null, 2));
})();
