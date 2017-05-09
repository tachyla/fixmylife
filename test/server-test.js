//'use: strict'
//require all packages
const chai = require('chai');
const chaiHttp = require('chai-http');
// const faker = require('faker');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

chai.should();

//REQUIRE model schema called {BlogPost} from models.js
// const { BlogPost } = require('../models');
const { runServer, closeServer } = require('../server');
const { PORT, DATABASE_URL } = require('../config');

//initialize Chai
chai.use(chaiHttp);
// console.log(TEST_DATABASE_URL);
// runServer(TEST_DATABASE_URL);



// function tearDownDb() {
//   console.warn('Deleting database');
//   return mongoose.connection.dropDatabase();
// }

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

    it('should be true', function () {
      var foo = true;
      foo.should.be.true;
    });


  });


});

