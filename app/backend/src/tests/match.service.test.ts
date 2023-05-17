import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { findAllMock, leaderboardDataMock, leaderboardTeamDataResultMock, newMatchBodyMock, newMatchResult, specificMatchMock } from './mocks/mockMatches';
import MatchModel from '../database/models/match.model';
import MatchService from '../services/match.service';
import CompleteMatch from '../interfaces/completeMatch.interface';
import { createMatch } from '../interfaces/createMatch.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in MatchService', () => {
  
  afterEach(async () => {
    sinon.restore();
  });

  describe('findAll', () => {
    it('retorna um array com todas as partidas do BD', async () => {
      // arrange
      sinon.stub(MatchModel, 'findAll').resolves(findAllMock as CompleteMatch[]);
      // act
      const validMatches = await MatchService.findAll();
      // assert
      expect(validMatches).to.be.deep.equal(findAllMock);
    });
  });
  describe('update inProgress by id', () => {
    it('update no bd alterando o inProgress de uma partida específica para true', async () => {
      // arrange
      sinon.stub(MatchModel,'update').resolves([1]);
      // act
      const updateInProgressById = await MatchService.updateInProgressById(41);
      // assert
      expect(updateInProgressById).to.be.deep.equal({ message: 'Finished' });  
    });
  });
  describe('update by Id', () => {
    it('update no bd alterando infos de uma partida', async () => {
      // arrange
      sinon.stub(MatchModel, 'update').resolves([1]);
      // act
      const updateById = await MatchService.updateById(41, specificMatchMock);
      // assert
      expect(updateById).to.be.deep.equal({ message: 'Finished' });
    });
  });
  describe('cadastrando uma nova partida no BD', () => {
    it('criando uma nova partida', async () => {
      // arrange
      sinon.stub(MatchModel, 'create').resolves({ dataValues: newMatchResult } as MatchModel)
      // act
      const newMatch = await MatchService.create(newMatchBodyMock as createMatch);
      // assert
      expect(newMatch).to.be.deep.equal(newMatchResult);
    });
  });
  describe('leaderboardData', () => {
    it('testando a saída', async () => {
      // arrange
      sinon.stub(MatchModel, 'findAll').resolves(leaderboardDataMock as MatchModel["dataValues"][]);
      // act
      const matches = await MatchService.leaderboardData(15);
      // assert
      expect(matches.length).to.be.equal(3);
    });
  });
  describe('leaderboardTeamData', () => {
    it('testando a saída para o time do São José-SP', async () => {
      // arrange
      sinon.stub(MatchModel, 'findAll').resolves(leaderboardDataMock as MatchModel["dataValues"][]);
      // act
      const saoJoseSpData = await MatchService.leaderboardTeamData(15, 'home');
      // assert
      expect(saoJoseSpData).to.be.deep.equal(leaderboardTeamDataResultMock);
    })
  })
});
