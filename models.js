const mongoose = require('mongoose');

const adviceEntrySchema = mongoose.Schema({
  author: String,
  title: String,
  content: String
});


const AdviceEntry = mongoose.model('AdviceEntry', adviceEntrySchema);
module.exports = { AdviceEntry };
