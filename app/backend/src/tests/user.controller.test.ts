import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserService from '../services/user.service';
import { validUserResultMock } from './mocks/mockUsers';
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
      sinon.stub(UserService, 'findByLogin').resolves({ user: validUserResultMock});
      let chaiHttpResponse: Response;
      // act
      chaiHttpResponse = await chai.request(app).post('/login').send({
        'email': '123@asdasd.com',
        'password': '1234556678'
      });
      // assert
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(typeof chaiHttpResponse.body.token).to.be.equal('string');
    });
  });

  // describe('findById', () => {  
  //   it('retorna um o e um status 200', async () => {
  //     // arrange
  //     sinon.stub(UserService, 'findById').resolves(findAllMock[0] as UserModel)
  //     // act
  //     const response = await chai.request(app).get('/Users/1');
  //     // assert
  //     expect(response.status).to.be.equal(200);
  //     expect(response.body).to.be.deep.equal(findAllMock[0]);
  //   })
  // })
})