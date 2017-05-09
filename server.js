const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const apiRoute = require('./config');
const { DATABASE_URL, PORT } = require('./config');
const {AdviceEntry} = require('./models');

const app = express();
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL);

app.get('/', (req, res) => {
  res.json(req.body); 
});


app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});

