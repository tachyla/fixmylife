const mongoose = require('mongoose');

const adviceEntrySchema = mongoose.Schema({
  author: {type: String, unique: true},
  title: String,
  content: String
});


const AdviceEntry = mongoose.model('AdviceEntry', adviceEntrySchema);
module.exports = { AdviceEntry };
