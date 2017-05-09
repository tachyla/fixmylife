const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const apiRoute = require('./config');
const { DATABASE_URL, PORT } = require('./config');
const {AdviceEntry} = require('./models');
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL);
app.use(logger('combined'));

app.get('/add', (req, res) => {
  AdviceEntry
  .find()
  .then(entry => {
    res.json(entry);
  });
});

app.get('/add/:id', (req, res) => {
  AdviceEntry
  .findById(req.params.id)
  .exec()
  .then( result => {
    res.json(result);
  });
});

app.post('/add', (req, res) => {
  AdviceEntry
  .create({
    content: req.body.content
  })
  .then(entry => {
    res.json(entry);
  })
  .catch(err => {
    console.error(err);
  });
});

app.put('/add/:id', (req, res) => {
  AdviceEntry
    .findByIdAndUpdate(req.params.id, {$set: {title: req.body.title, content: req.body.content, author: req.body.author}, new: true})
    .exec()
    .then( updated => {
      console.log(updated);
      res.json(updated);
    });
});

app.delete('/add/:id', (req, res) => {
  AdviceEntry
  .findByIdAndRemove(req.params.id)
  .exec()
  .then( () => {
    res.sendStatus(204);
  });
});

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});