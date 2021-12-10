const { Dog, Temperament ,conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});

describe('Find All Temperaments in database', function() {
    it('should have length 125, this has been pre-charged',  function() {
      Temperament.findAll()
      .then(function (res){
        expect(res.body).to.be.have.length(125) 
      });
    });
  });



