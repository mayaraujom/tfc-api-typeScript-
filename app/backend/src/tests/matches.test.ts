import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


chai.use(chaiHttp);

const { expect } = chai;

describe('Matches tests', () => {
  it('GET com resposta com status 200 e com um json com as partidas', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(48);
  });
  it('GET das partidas em progresso', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(8);
  });
  it('GET das partidas finalizadas', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(40);
  });
  it('Atualizando partida finalizada', async () => {
    const chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.length(40);
  });
  it('POST adiciona partida em progresso', async () => {
    const chaiHttpResponse = await chai.request(app).patch('/matches/41').send({
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
