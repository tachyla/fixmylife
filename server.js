const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const apiRoute = require('./config');
const { DATABASE_URL, PORT } = require('./config');

const app = express();
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL);

app.get(`/${apiRoute}`, (req, res) => {
  res.send('hello world!'); 
});


app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});

// $.getJSON('', function(res) {
//     res.json();    
// });