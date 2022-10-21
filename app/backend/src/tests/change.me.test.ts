import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/users';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Login tests', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      email: 'admin@admin.com',
      password: '$2a$12$VbV0qveLJPGYyQzGbItos.Jf8smlErLxtVX8YfYCmmy8wFUTWO/Xu',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('O avaliador verificará se é possível fazer o login com dados corretos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('O avaliador verificará se é possível fazer o login com dados incorretos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_adminastror',
    });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).not.to.have.property('token');
  });
});

