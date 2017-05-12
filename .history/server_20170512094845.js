const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
var fetch = require('node-fetch');
const cors = require('cors');

const { DATABASE_URL, PORT } = require('./config');
const { AdviceEntry, Comments } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL);
app.use(logger('combined'));
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//route endpoints
//const login = require('./routes/login');
//ROUTE RENAMED HERE
const topic = require('./routes/topic');
// const user = require('./routes/user');

//app.use(login)
// app.use(user);
app.use(topic);

fetch('https://reddit.com/r/relationships.json?limit=10')
  .then(function(res) {
    return res.json();
  })
  .then(function(json) {
    const topicsArray = [];
    for (let i = 0; i < 10; i++) {
      topicsArray.push({
        content: json.data.children[i].data.selftext,
        author: json.data.children[i].data.author,
        title: json.data.children[i].data.title,
      });
    }
      //reduce amount of times call to db
    AdviceEntry
      .insertMany(topicsArray)
      .catch(err => {
        err;
      });

  });

//Server functions
let server;
function runServer(databaseUrl, port) {
  return new Promise((resolve, reject) => {
    mongoose.createConnection(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL, PORT).catch(err => {
    console.log(err);
  });
}

module.exports = { runServer, app, closeServer };
