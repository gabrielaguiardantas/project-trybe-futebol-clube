import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { findAllMock } from './mocks/mockTeams';

import { Response } from 'superagent';
import TeamService from '../services/team.service';
import UserModel from '../models/user.model';
import UserService from '../services/user.service';
import { validUserMock, validUserResultMock } from './mocks/mockUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in UserService', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;

  describe('findByLogin', () => {
    
    afterEach(async () => {
      sinon.restore();
    });

    it('retorna um usuário válido ao receber email e password corretos', async () => {
      // arrange
      sinon.stub(UserModel, 'findOne').resolves(validUserResultMock as UserModel);
      sinon.stub(UserService, 'checkPassword').resolves(true);
      // act
      const validUser = await UserService.findByLogin('user@user.com', 'qualquercoisa');
      // assert
      expect(validUser).to.be.deep.equal({ user: validUserResultMock });
    });
    it('retorna mensagem de email ou password inválido ao receber um email ou password incorretos', async () => {
      // arrange 
      sinon.stub(UserModel, 'findOne').resolves(validUserMock as UserModel);
      // act
      const invalidUser = await UserService.findByLogin('user@user.com', 'qualquercoisa');
      // assert
      expect(invalidUser).to.be.deep.equal({ json: { message: 'Invalid email or password' } });
    })
  });

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
