import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { findAllMock } from './mocks/mockMatches';
import MatchModel from '../database/models/match.model';
import MatchService from '../services/match.service';
import CompleteMatch from '../interfaces/completeMatch.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in MatchService', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  describe('findAll', () => {
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um array com todas as partidas do BD', async () => {
      // arrange
      sinon.stub(MatchModel, 'findAll').resolves(findAllMock as CompleteMatch[]);
      // act
      const validMatches = await MatchService.findAll();
      // assert
      expect(validMatches).to.be.deep.equal(findAllMock);
    });
  });

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
