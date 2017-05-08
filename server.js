const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { DATABASE_URL, PORT } = require('./config');

const app = express();
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL);

app.get('/', (req, res) => {
    //writes hello world
  res.send('hello world!'); 
});


app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});
