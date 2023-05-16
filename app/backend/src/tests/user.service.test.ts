import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import UserModel from '../database/models/user.model';
import UserService from '../services/user.service';
import { validUserMock, validUserResultMock } from './mocks/mockUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in UserService', () => {

  afterEach(async () => {
    sinon.restore();
  });

  describe('findByLogin', () => {
    it('retorna um usuário válido ao receber email e password corretos', async () => {
      // arrange
      sinon.stub(UserModel, 'findOne').resolves(validUserMock as UserModel);
      // act
      const validUser = await UserService.findByLogin('user@user.com', 'secret_user');
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
    });
  });
});
