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
const { AdviceEntry } = require('../models');

//initialize Chai
chai.use(chaiHttp);
// console.log(TEST_DATABASE_URL);
// runServer(TEST_DATABASE_URL);

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

//PARENT DESCRIBE Function
describe('AdviceEntry API resource', function() {
  before(function() {
    return runServer(DATABASE_URL, PORT);
  });

  beforeEach(function() {
    // return seedBlogPostData();
  });

  afterEach(function() {
    // return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {
    it('should display all existing items', function() {
      let res;

      return chai
        .request(app)
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
      return chai
        .request(app)
        .get('/item')
        .then(results => {
          res = results;
          res.should.have.status(200);
          res.should.be.json;

          res.body.forEach(function(result) {
            result.should.be.a('object');
            result.should.have.any.keys('_id', '__v','author', 'content', 'title');
          });
          return AdviceEntry.count();
        })
        .then(count => {
          res.body.should.have.length.of(count);
        });
    });
  });

  describe('POST endpoint', function() {
    it('should add a new entry', function() {
      //QUESTION MAYBE WE SHOULD USE FAKER??
      const newEntry = {
        author: 'Test Author',
        title: 'Test Title',
        content: 'Test Content Test Content Test Content Test Content'
      };

      return chai.request(app)
      .post('/item')
      .send(newEntry)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('_id', '__v', 'author', 'content', 'title');
        res.body._id.should.not.be.null;
        res.body.author.should.equal(newEntry.author);
        res.body.title.should.equal(newEntry.title);
        res.body.content.should.equal(newEntry.content);

        return AdviceEntry.findById(res.body._id).exec();
      })
      .then(function(entry) {
        entry.author.should.equal(newEntry.author);
        entry.title.should.equal(newEntry.title);
        entry.content.should.equal(newEntry.content);
      });
    });
  });

  describe('PUT endpoint', function(){
    it('should update an entry', function(){
      const updateEntry = {
        'author': 'UPDATED AUTHOR',
        'title': 'UPDATED TITLE',
        'content': 'TEST UPDAT TEST UPDATE TEST UPDATE TEST UPDATE TEST UPDATE '
      };
      return AdviceEntry
        .findOne()
        .exec()
        .then(entry => {
          updateEntry._id = entry._id;

          return chai.request(app)
            .put(`/item/${entry._id}`)
            .send(updateEntry)
        })
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.author.should.equal(updateEntry.author);
          res.body.title.should.equal(updateEntry.title);
          res.body.content.should.equal(updateEntry.content);

          return AdviceEntry.findById(res.body._id).exec();
        })
        .then(entry => {
          entry.author.should.equal(updateEntry.author);
          entry.title.should.equal(updateEntry.title);
          entry.content.should.equal(updateEntry.content);
        });

    });
  });

});