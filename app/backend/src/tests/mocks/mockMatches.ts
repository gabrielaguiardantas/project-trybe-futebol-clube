import MatchModel from "../../database/models/match.model";

const findAllMock = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Internacional'
    }
  }
];

const specificMatchMock =   {
  homeTeamGoals: 5,
  awayTeamGoals: 1
};
const newMatchBodyMock = {
  homeTeamId: 16,
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const newMatchResult = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

export { findAllMock, specificMatchMock, newMatchResult, newMatchBodyMock };