const express = require('express');
const router = express.Router();
const { AdviceEntry } = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const path = require('path');

// router.get('/users', (req, res) => {
router.get('/topics', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/user.html'));
  res.sendFile(path.join(__dirname, '../public/topic.html'));
});

router.get('/topics/:topic_id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/topic_id.html'));
});

//to identify that its meant for BE; just to display data
router.get('/api/topics/:topic_id', (req, res) => {
  AdviceEntry
    .findOne({_id: req.params.topic_id })
    .then(results => {
      res.json(results.content);
    });

  // res.json({message: req.params.topic_id});
});



router.get('/items', (req, res) => {
  AdviceEntry.find()
    .then(entry => {
      res.json(entry);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

router.get('/items/:id', (req, res) => {
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

router.post('/items', (req, res) => {
  const requiredFields = ['author', 'title', 'content'];

  for (let i = 0; i < requiredFields.length; i++) {
    requiredFields.forEach(field => {
      if (!(field in req.body)) {
        res.status(400).json({ error: `Missing "${field}" in request body` });
        // res.status(400).send(`Missing ${field} field in request body.`);
      }
    });
  }
  AdviceEntry.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content
  })
    .then(entry => {
      res.status(201).json(entry);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});
//put request for adding comments to topics
router.put('/api/items/:id', function(res, req) {

});



router.put('/items/:id', (req, res) => {
  const requiredFields = ['author', 'title', 'content'];

  for (let i = 0; i < requiredFields.length; i++) {
    const require = requiredFields[i];
    if (!(require in req.body)) {
      res.status(400).send(`Missing ${require} field.`);
    }
  }

  AdviceEntry.findByIdAndUpdate(req.params.id,
    { $set: {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    }},
    { new: true }
  )
  .exec()
  .then(updated => {
      // console.log(updated);
    res.status(201).json(updated);
  })
    .catch(err => {
      console.error(err);
      res.status(500);
    });
});

router.delete('/items/:id', (req, res) => {
  AdviceEntry.findByIdAndRemove(req.params.id).exec().then( () => {
    res.status(204).end();
  });
});
// .catch(err => {
//   console.error(err);
//   res.status(500);
// });

module.exports = router;