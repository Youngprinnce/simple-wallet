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

const credentials = {
  email: 'test@ma.com',
  firstname: 'Foo',
  lastname: 'Bar',
  password: bcrypt.hashSync('password', 10),
  account_no: 'test1',
};

const testWithdraw = {
  balance: '100',
  ...credentials,
};

describe('POST /users', () => {
  beforeEach(async () => {
    await db('users').del();
    await db('transactions').del();
  });

  after(async () => {
    await db('users').del();
    await db('transactions').del();
  });

  it('Should return success as false and ("email" is not allowed to be empty) if email field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/register')
      .send({
        email: '',
        password: 'Foobar1!',
        firstname: 'Foo',
        lastname: 'Bar',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql('"email" is not allowed to be empty');
        done();
      });
  });

  it('Should return success as false and ("email" must be a valid email) if email field is not a valid email format', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'foo.com',
        password: 'Foobar1!',
        firstname: 'Foo',
        lastname: 'Bar',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql('"email" must be a valid email');
        done();
      });
  });

  it('Should return success as false and ("firstname" is not allowed to be empty) if firstname field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'foo@bar.com',
        password: 'Foobar1!',
        firstname: '',
        lastname: 'Bar',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql('"firstname" is not allowed to be empty');
        done();
      });
  });

  it('Should return success as false and ("lastname" is not allowed to be empty) if lastname field is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'foo@bar.com',
        password: 'Foobar1!',
        firstname: 'Foo',
        lastname: '',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql('"lastname" is not allowed to be empty');
        done();
      });
  });

  it('Should return success as false if password does not match correct format', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'foo@bar.com',
        password: 'For1',
        firstname: 'Foo',
        lastname: 'Bar',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(422);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.eql(false);
        expect(res.body.message).to.be.eql('Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length');
        done();
      });
  });

  it('Should return success as true if user register', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/register')
      .send({
        email: 'foo@bar.com',
        password: 'Foobar1!',
        firstname: 'Foo',
        lastname: 'Bar',
      })
      .end((err, res) => {
        expect(res.status).to.be.eql(201);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.eql(true);
        expect(res.body.message).to.be.eql('User created successfully');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.haveOwnProperty('token');
        expect(res.body.data).to.haveOwnProperty('user');
        expect(res.body.data.user.firstname).to.be.eql('Foo');
        expect(res.body.data.user).to.haveOwnProperty('email');
        expect(res.body.data.user.email).to.be.eql('foo@bar.com');
        expect(res.body.data.user).to.haveOwnProperty('lastname');
        expect(res.body.data.user.lastname).to.be.eql('Bar');
        expect(res.body.data.user).to.haveOwnProperty('balance');
        expect(res.body.data.user.balance).to.be.eql('0.00');
        expect(res.body.data.user).to.haveOwnProperty('account_no');
        done();
      });
  });

  it('Should return success as true and login the user', (done) => {
    db('users').insert(credentials).then((id) => db('users').where({ id }).first()).then((user) => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.be.eql(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.eql(true);
          expect(res.body.message).to.be.eql('User logged in successfully');
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.haveOwnProperty('token');
          expect(res.body.data).to.haveOwnProperty('user');
          done();
        });
    });
  });

  it('Should return success as true and fund the user account', (done) => {
    db('users').insert(credentials).then((id) => db('users').where({ id }).first()).then((user) => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: 'password',
        })
        .end((err, res) => {
          chai
            .request(app)
            .post('/api/v1/users/deposit')
            .set('Authorization', `Bearer ${res.body.data.token}`)
            .send({
              amount: '100',
            })
            .end((err, res) => {
              expect(res.status).to.be.eql(200);
              expect(res.body).to.be.an('object');
              expect(res.body.success).to.be.eql(true);
              expect(res.body.message).to.be.eql('Deposit successful');
              expect(res.body.data).to.be.an('object');
              expect(res.body.data).to.haveOwnProperty('balance');
              expect(res.body.data.balance).to.be.eql('100.00');
              done();
            });
        });
    });
  });

  it('Should return success as true and debit the user account', (done) => {
    db('users').insert(testWithdraw).then((id) => db('users').where({ id }).first()).then((user) => {
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: 'password',
        })
        .end((err, res) => {
          chai
            .request(app)
            .post('/api/v1/users/withdraw')
            .set('Authorization', `Bearer ${res.body.data.token}`)
            .send({
              amount: '50',
            })
            .end((err, res) => {
              expect(res.status).to.be.eql(200);
              expect(res.body).to.be.an('object');
              expect(res.body.success).to.be.eql(true);
              expect(res.body.message).to.be.eql('Withdrawal successful');
              expect(res.body.data).to.be.an('object');
              expect(res.body.data).to.haveOwnProperty('balance');
              expect(res.body.data.balance).to.be.eql('50.00');
              done();
            });
        });
    });
  });
});
