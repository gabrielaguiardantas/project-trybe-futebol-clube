import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { validUserMock } from './mocks/mockUsers';
import UserModel from '../database/models/user.model';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('some tests in UserController', () => {
  afterEach(async () => {
    sinon.restore();
  });
  describe('login', () => {
    it('retorna um token e um status 200 em caso de sucesso no login', async () => {
      // arrange
      sinon.stub(UserModel, 'findOne').resolves(validUserMock as UserModel);
      let chaiHttpResponse: Response;
      // act
      chaiHttpResponse = await chai.request(app).post('/login').send({
        'email': 'user@user.com',
        'password': 'secret_user'
      });
      // assert
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).property('token');
    });
  });
});