const mongoose = require('mongoose');

const adviceEntrySchema = mongoose.Schema({
  author: {type: String, unique: true},
  title: String,
  content: String,
  //This needs to be embedded data
  comment: [{type: String}]
  //store id of comment
  //fetch
  //comment can't be used here because of overwriting issues
});

//Need to save this comment to each specific post
//const commentSchema = mongoose.Schema({
  //comment: String
//});


const AdviceEntry = mongoose.model('AdviceEntry', adviceEntrySchema);
//const Comment= mongoose.model('Comment', commentSchema);
module.exports = { AdviceEntry, /*Comment*/ };
