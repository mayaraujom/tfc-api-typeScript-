import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard tests', () => {
  it('GET HOME TEAMS com resposta com status 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(16);
  });
  it('GET AWAY TEAMS com resposta com status 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(16);
  });
  it('GET ALL TEAMS com resposta com status 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(16);
  });
});
