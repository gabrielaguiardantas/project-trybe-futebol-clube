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

const leaderboardDataMock = [
  {
    id: 8,
    homeTeamId: 15,
    homeTeamGoals: 0,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: 0
  },
  {
    id: 23,
    homeTeamId: 15,
    homeTeamGoals: 2,
    awayTeamId: 16,
    awayTeamGoals: 3,
    inProgress: 0
  },
  {
    id: 37,
    homeTeamId: 15,
    homeTeamGoals: 0,
    awayTeamId: 13,
    awayTeamGoals: 1,
    inProgress: 0
  }
];

const leaderboardTeamDataResultMock = {
  efficiency: "0.00",
  goalsBalance: -3,
  goalsFavor: 2,
  goalsOwn: 5,
  name: "São José-SP",
  totalDraws: 0,
  totalGames: 3,
  totalLosses: 3,
  totalPoints: 0,
  totalVictories: 0
}

export { findAllMock, specificMatchMock, newMatchResult, newMatchBodyMock, leaderboardDataMock, leaderboardTeamDataResultMock };