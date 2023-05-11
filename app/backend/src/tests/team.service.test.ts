import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { findAllMock } from './mocks/mockTeams';

import { Response } from 'superagent';
import TeamService from '../database/services/team.service';
import TeamModel from '../database/models/team.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('some testes in TeamService', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  describe('findAll', () => {
    
    afterEach(async () => {
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

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
    
    afterEach(async () => {
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('retorna o time com o id buscado', async () => {
      // arrange
      sinon.stub(TeamModel, 'findByPk').resolves(findAllMock[0] as TeamModel);
      // act
      const team = await TeamService.findById(1);
      // assert
      expect(team).to.be.equal(findAllMock[0]);
    })
  })


  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
