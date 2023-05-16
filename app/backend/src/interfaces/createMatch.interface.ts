import MatchModel from '../database/models/match.model';

export interface createMatch extends MatchModel {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}
