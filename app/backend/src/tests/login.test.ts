import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Login tests', () => {
  it('O avaliador verificará se é possível fazer o login com dados corretos', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('O avaliador verificará se é possível fazer o login com dados incorretos', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_adminastror',
    });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).not.to.have.property('token');
  });
  it('O avaliador verificará se é possível fazer o login sem informar email', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: '',
      password: 'secret_adminastror',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).not.to.have.property('token');
  });
  it('O avaliador verificará se é possível fazer o login sem informar email', async () => {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: '',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).not.to.have.property('token');
  });
});
