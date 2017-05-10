const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require('./config');
const { AdviceEntry } = require('./models');
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL);
app.use(logger('combined'));

app.get('/item', (req, res) => {

  AdviceEntry
  .find()
    .then(entry => {
      res.json(entry);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/item/:id', (req, res) => {
  AdviceEntry.findById(req.params.id)
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post('/item', (req, res) => {
  const requiredFields = ['author', 'title', 'content'];

  for(let i = 0; i<requiredFields.length; i++) {
    const require = requiredFields[i];
    requiredFields.forEach(field => {
      if (!(field in req.body)) {
      // res.status(400).json({error: `Missing "${field}" in request body`});
        res.status(400).send(`Missing ${field} field in request body.`);
      }
    });
  }    
  AdviceEntry
    .create({
            author: req.body.author,
            title: req.body.title,
            content: req.body.content
  })
    .then(entry => {
      res.json(entry);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/item/:id', (req, res) => {
  const requiredFields = ['author', 'title', 'content'];

  for(let i = 0; i < requiredFields.length; i++) {
    const require = requiredFields[i];
    if(!(require in req.body)) {
      res.status(400).send(`Missing ${require} field.`);
    }
  }

  AdviceEntry.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    },
    new: true
  })
    .exec()
    .then(updated => {
      console.log(updated);
      res.json(updated);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/item/:id', (req, res) => {
  AdviceEntry.findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

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
