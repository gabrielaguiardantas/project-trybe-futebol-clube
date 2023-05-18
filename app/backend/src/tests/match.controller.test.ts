import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { findAllMock, leaderboardDataMock, newMatchBodyMock, newMatchResult } from './mocks/mockMatches';
import { app } from '../app';
import CompleteMatch from '../interfaces/completeMatch.interface';
import MatchModel from '../database/models/match.model';
import MatchService from '../services/match.service';
import MatchController from '../controllers/match.controller';
import TeamModel from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in MatchController', () => {

  afterEach(() => {
    sinon.restore();
  });

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDMzNTU2MCwiZXhwIjoxNjg0NTk0NzYwfQ.QieacH1Ti1L9pKORenmQ7EC9eKnXBD9zqBuL9FPaCeU';

  describe('findAll', () => {
    it('retorna um array do mock e um status 200', async () => {
      // arrange
      sinon.stub(MatchModel, 'findAll').resolves(findAllMock as CompleteMatch[]);
      // act
      const response = await chai.request(app).get('/matches');
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(findAllMock);
    });
  });
  describe('update inProgress by Id', () => {
    it('retorna uma mensagem de Finished e um status 200', async () => {
      // arrange
      sinon.stub(MatchModel, 'update').resolves([1]);
      // act
      const response = await chai.request(app).patch('/matches/:id/finish').set('Authorization', token);
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });
  describe('update by Id', () => {
    it('retorna uma mensagem de Finished e um status 200', async () => {
      // arrange
      sinon.stub(MatchModel, 'update').resolves([1]);
      // act
      const response = await chai.request(app).patch('/matches/:id').set('Authorization', token);
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });
  describe('create', () => {
    it('retorna a nova partida criada e um status 201', async () => {
      // arrange
      sinon.stub(MatchModel, 'create').resolves({ dataValues: newMatchResult } as MatchModel);
      // act
      const response = await chai.request(app).post('/matches').send(newMatchBodyMock).set('Authorization', token);
      // assert
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(newMatchResult);
    });
  });
  describe('leaderboardHome', () => {
    it('retorna um array de times com seus dados respectivos e um status 200', async () => {
      // arrange
      sinon.stub(MatchModel, 'findAll').resolves(leaderboardDataMock as MatchModel["dataValues"][]);
      // act
      const response = await chai.request(app).get('/leaderboard/home');
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.be.deep.equal(16);
    });
  });
  describe('leaderboardAway', () => {
    it('retorna um array de times com seus dados respectivos e um status 200', async () => {
      // arrange
      sinon.stub(MatchModel, 'findAll').resolves(leaderboardDataMock as MatchModel["dataValues"][]);
      // act
      const response = await chai.request(app).get('/leaderboard/away');
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.be.deep.equal(16);
    });
  });
});