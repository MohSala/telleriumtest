import { config } from '../app/config/config';

// Require dependencies
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app/app';
const should  = chai.should();

chai.use(chaiHttp);

// Testing Get no users
describe('/Get users data', () => {
  it('should respond with no users available', (done) => {
    chai.request(app)
      .get('/user')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(404);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql("No user data found");
        res.body.should.have.property('code').eql(404);
        res.body.should.have.property('error').eql(false);
        done();
      });
  });
});


//Test to add users

describe('/Add user data', () => {
  it('should add user data', (done) => {
    chai.request(app)
      .post('/user')
      .send({
        "name": "Paul"
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql("User created successfully");
        res.body.should.have.property('code').eql(201);
        res.body.should.have.property('error').eql(false);
        done();
      });
  });
});

// Testing Get users
describe('/Get users data', () => {
  it('should respond with data of users', (done) => {
    chai.request(app)
      .get('/user')
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('message').eql("User data gotten successfully");
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('error').eql(false);
        done();
      });
  });
});



//Test to add hobbies

describe('/Add user data', () => {
  it('should add user data', (done) => {
    chai.request(app)
      .post('/hobby')
      .send({
        "id": "5df8cc6e4f9e53198515a592",
        "name": "Coding",
        "passionLevel": "Very-High",
        "year": "2014"
      })
      .end((err, res) => {
        if (err) done(err);
        res.should.have.status(201);
        res.body.should.have.property('message');
        res.body.should.have.property('code');
        res.body.should.have.property('data');
        res.body.should.have.property('message').eql("Hobby created successfully");
        res.body.should.have.property('code').eql(201);
        res.body.should.have.property('error').eql(false);
        done();
      });
  });
});

