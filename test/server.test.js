const { describe, it } = require('mocha');
const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);

describe('Server', () => {
  it('Should display LendSqr E-wallet application service API', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.eql(true);
        expect(res.body.message).to.eql(
          'LendSqr E-wallet application service API',
        );
        done();
      });
  });

  it('Should display Could not find the requested resource on the server!', (done) => {
    chai
      .request(app)
      .post('/hello')
      .end((err, res) => {
        expect(res.status).to.be.eql(404);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.eql(false);
        expect(res.body.message).to.eql(
          'Could not find the requested resource on the server!',
        );
        done();
      });
  });
});
