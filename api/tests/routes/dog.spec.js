/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: "10-20",
  weight: "10-20",
  life_span: "10-20 "

};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
})


  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs')
      .expect(200)
      .expect('Content-Type', /json/) 
      .expect(function(res) {
      expect(res.body).to.have.length(172) 
    
    }));
  });


describe('GET /temperaments', function()  { 
  it('should return all genres', function () {
    agent.get('/temperaments')
    .expect(200)
    .expect('Content-Type', /json/) 
    .expect(function(res) {
    expect(res.body).to.have.length(125); 
    })
  });
});
