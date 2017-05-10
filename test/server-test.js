const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
mongoose.Promise = global.Promise;
const faker = require('faker');
const should = chai.should();
//REQUIRE model schema called {BlogPost} from models.js
// const { BlogPost } = require('../models');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL, PORT } = require('../config');
const { AdviceEntry } = require('../models');
app.use(jsonParser);
//initialize Chai
chai.use(chaiHttp);
// console.log(TEST_DATABASE_URL);
// runServer(TEST_DATABASE_URL);

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

function seedAdviceEntryData() {
  console.info('Seeding AdviceEntry Data');
  const seedData = [];
  for(let i = 1; i < 10; i++) {
    seedData.push(generateAdviceEntryData());
  }
  return AdviceEntry.insertMany(seedData);
}
function generateAdviceEntryData() {
  return { author: faker.name.firstName(), title: faker.lorem.sentence(), content: faker.lorem.sentence() };
}

//PARENT DESCRIBE Function
describe('AdviceEntry API resource unit tests', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL, PORT);
  });

  beforeEach(function() {
    return seedAdviceEntryData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {
    it('should display all existing items', function() {
      let res;

      return chai
        .request(app)
        .get('/items')
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
        .get('/items')
        .then(results => {
          res = results;
          res.should.have.status(200);
          res.should.be.json;

          res.body.forEach(function(result) {
            result.should.be.a('object');
            result.should.have.any.keys(
              '_id',
              '__v',
              'author',
              'content',
              'title'
            );
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
        content: 'Test Content Test Content Test Content Test Content',
      };

      return chai
        .request(app)
        .post('/items')
        .send(newEntry)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            '_id',
            '__v',
            'author',
            'content',
            'title'
          );
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

  describe('PUT endpoint test', function() {
    it('should update an entry by id', function() {
      const updateEntry = {
        author: 'Bobo',
        title: 'Updated Title',
        content: 'Updated Content Updated Content Updated Content Updated Content',
      };
      return (
        AdviceEntry.findOne()
          .exec()
          .then(entry => {
            //console.log('this is what it is finding:', entry);//it only gets the _id: and __v: entry is from database
            updateEntry._id = entry._id;
            entry.author = updateEntry.author;
            entry.title = updateEntry.title;
            entry.content = updateEntry.content;
            //console.log('This is the original entry in database:', original);
            return chai
              .request(app)
              .put(`/items/${entry._id}`)
              .send(updateEntry);
          })
          .then(res => {
            //res is item from database
            //console.log(res.body);//this is updateEntry with an _id:
            res.should.have.status(201);
            res.should.be.json;
            res.should.be.a('object');
            // console.log('What what', res.body.author);
            res.body.author.should.equal(updateEntry.author);
            res.body.title.should.equal(updateEntry.title);
            res.body.content.should.equal(updateEntry.content);
            //this is the updateEntry object
            return AdviceEntry.findById(res.body._id).exec();
          })
          //entry is updateEntry object
          .then(entry => {
            //checks if original id matches updated id
            //console.log(typeof entry._id);
            //console.log(typeof updateEntry._id);
            //JSON.stringify(entry._id).should.equal(JSON.stringify(updateEntry._id));
            //check if database item is updateEntry object
            entry._id.should.deep.equal(updateEntry._id);
            entry.author.should.equal(updateEntry.author);
            entry.title.should.equal(updateEntry.title);
            entry.content.should.equal(updateEntry.content);
          })
      );
    });
  });
  describe('DELETE endpoint', function() {
    it('should delete an entry by id', function() {
      let entry;

      return AdviceEntry.findOne()
        .exec()
        .then(_entry => {
          entry = _entry;
          return chai.request(app).delete(`/items/${entry._id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return AdviceEntry.findById(entry._id);
        })
        .then(entry => {
          should.not.exist(entry);
        });
    });
  });
});
