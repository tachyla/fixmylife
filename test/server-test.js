const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

mongoose.Promise = global.Promise;

chai.should();

//REQUIRE model schema called {BlogPost} from models.js
// const { BlogPost } = require('../models');
const { app, runServer, closeServer } = require('../server');
const { DATABASE_URL, PORT } = require('../config');
const {AdviceEntry} = require('../models');

//initialize Chai
chai.use(chaiHttp);
// console.log(TEST_DATABASE_URL);
// runServer(TEST_DATABASE_URL);



function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

//PARENT DESCRIBE Function
describe('BlogPost API resource', function () {

  before(function () {
    return runServer(DATABASE_URL, PORT);
  });

  beforeEach(function () {
    // return seedBlogPostData();
  });

  afterEach(function () {
    // return tearDownDb();
  });

  after(function () {
    return closeServer();
  });




  describe('GET endpoint', function () {

    it('should display all existing items', function () {
      let res;

      return chai.request(app)
        .get('/item')
        .then(results => {
          res = results; 
          res.should.have.status(200);
          res.should.be.json;

          return AdviceEntry.count();
        })
        .then(count => {
          res.body.should.have.length.of(count);
        });
    });

    it('each item should display the correct keys', function() {
        let res; 
        return chai.request(app)
        .get('/item')
        .then(results => {
            res = results; 
          res.should.have.status(200);
          res.should.be.json;

          res.body.forEach(function(result) {
            result.should.be.a('object');
            result.should.have.any.keys('author', 'content', 'title');
          });
           return AdviceEntry.count();
        })
        .then(count => {
          res.body.should.have.length.of(count);
        });
          
    });
  });

});
 


