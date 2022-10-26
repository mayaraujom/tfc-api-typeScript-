import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { firstAwayTeam, firstHomeTeam } from './mocks/orderTeams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard tests', () => {
  it('GET HOME TEAMS com resposta com status 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    const firstTeam = chaiHttpResponse.body[0]

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(16);
    expect(firstTeam).to.deep.equal(firstHomeTeam);
  });
  it('GET AWAY TEAMS com resposta com status 200', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    const firstTeam = chaiHttpResponse.body[0]

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(16);
    expect(firstTeam).to.deep.equal(firstAwayTeam);
  });
});
