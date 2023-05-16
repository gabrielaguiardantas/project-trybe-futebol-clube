import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { findAllMock } from './mocks/mockTeams';
import TeamModel from '../database/models/team.model';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in TeamController', () => {

  afterEach(() => {
    sinon.restore();
  })
  
  describe('findAll', () => {
    it('retorna um array do mock e um status 200', async () => {
      // arrange
      sinon.stub(TeamModel, 'findAll').resolves(findAllMock as TeamModel[])
      // act
      const response = await chai.request(app).get('/teams');
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(findAllMock);
    });
  });

  describe('findById', () => {
    it('retorna um objeto do mock e um status 200', async () => {
      // arrange
      sinon.stub(TeamModel, 'findByPk').resolves(findAllMock[0] as TeamModel)
      // act
      const response = await chai.request(app).get('/teams/1');
      // assert
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(findAllMock[0]);
    })
  })
})