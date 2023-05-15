import MatchModel from '../database/models/match.model';

export default interface CompleteMatch extends MatchModel {
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
}
