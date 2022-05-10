/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const { describe, it } = require('mocha');
const chai = require('chai');
const bcrypt = require('bcrypt');

const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
const db = require('../src/database/connection');

const test = [
  {
    email: 'test1@test.com',
    firstname: 'Foo',
    lastname: 'Bar',
    password: bcrypt.hashSync('password', 10),
    account_no: 'test1',
    balance: '100',
  },
  {
    email: 'test2@test.com',
    firstname: 'Foo',
    lastname: 'Bar',
    password: bcrypt.hashSync('password', 10),
    account_no: 'test2',
    balance: '0.00',
  },
];

describe('POST /transactions', () => {
  beforeEach(async () => {
    await db('users').del();
    await db('transactions').del();
  });

  after(async () => {
    await db('users').del();
    await db('transactions').del();
  });

  it('Should return success as true and perform a transaction', (done) => {
    db('users').insert(test).then(() => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'test1@test.com',
          password: 'password',
        })
        .end((err, res) => {
          chai
            .request(app)
            .post('/api/v1/transactions/transfer')
            .set('Authorization', `Bearer ${res.body.data.token}`)
            .send({
              amount: '50',
              receiver: 'test2',
            })
            .end((err, res) => {
              expect(res.status).to.be.eql(201);
              expect(res.body).to.be.an('object');
              expect(res.body.success).to.be.eql(true);
              expect(res.body.message).to.be.eql('Transaction successfull');
              expect(res.body.data).to.be.an('object');
              expect(res.body.data).to.haveOwnProperty('amount');
              expect(res.body.data.amount).to.be.eql('50.00');
              expect(res.body.data).to.haveOwnProperty('sender');
              expect(res.body.data.sender).to.be.eql('test1');
              expect(res.body.data).to.haveOwnProperty('receiver');
              expect(res.body.data.receiver).to.be.eql('test2');
              done();
            });
        });
    });
  });
});
