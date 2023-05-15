import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { findAllMock } from './mocks/mockMatches';
import MatchService from '../services/match.service';

import { app } from '../app';
import CompleteMatch from '../interfaces/completeMatch.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in MatchController', () => {
  describe('findAll', () => {

    afterEach(async () => {
      (MatchService.findAll as sinon.SinonStub).restore();
    });

    it('retorna um array do mock e um status 200', async () => {
      // arrange
      sinon.stub(MatchService, 'findAll').resolves(findAllMock as CompleteMatch[])
      // act
      const response = await chai.request(app).get('/matches');
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(findAllMock);
    });
  });

  // describe('findById', () => {

  //   afterEach(async () => {
  //     (TeamService.findById as sinon.SinonStub).restore();
  //   });
    
  //   it('retorna um objeto do mock e um status 200', async () => {
  //     // arrange
  //     sinon.stub(TeamService, 'findById').resolves(findAllMock[0] as TeamModel)
  //     // act
  //     const response = await chai.request(app).get('/teams/1');
  //     // assert
  //     expect(response.status).to.be.equal(200);
  //     expect(response.body).to.be.deep.equal(findAllMock[0]);
  //   })
  // })
})