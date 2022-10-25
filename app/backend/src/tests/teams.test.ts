import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeams } from './mocks/teams.mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teams tests', () => {
  it('GET com resposta com status 200 e com um json com os times', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams);
  });
  it('GET com id, resposta com status 200 e com um json com o time específico', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams[0]);
  });
  it('GET com id invalido, resposta com status 404', async () => {
    const chaiHttpResponse = await chai.request(app).get('/teams/100');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.have.property('message');
  });
});
