const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require('./config');

const app = express();
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL);
app.use(logger('combined'));
app.use(express.static('public'));

//route endpoints
const router = require('./routes/routes');
app.use(router);

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
