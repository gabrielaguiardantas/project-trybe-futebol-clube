import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { findAllMock } from './mocks/mockTeams';
import TeamService from '../services/team.service';
import TeamModel from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in TeamService', () => {
  
  afterEach(async () => {
    sinon.restore();
  });

  describe('findAll', () => {
    it('retorna um array do mock', async () => {
      // arrange
      sinon.stub(TeamModel, 'findAll').resolves(findAllMock as TeamModel[]);
      // act
      const teams = await TeamService.findAll();
      // assert
      expect(teams).to.be.deep.equal(findAllMock);
    });
  });

  describe('findById', () => {
    it('retorna o time com o id buscado', async () => {
      // arrange
      sinon.stub(TeamModel, 'findByPk').resolves(findAllMock[0] as TeamModel);
      // act
      const team = await TeamService.findById(1);
      // assert
      expect(team).to.be.equal(findAllMock[0]);
    });
  });
});
