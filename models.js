const AdviceEntrySchema = mongoose.Schema({
    content: String
});

const AdviceEntry = mongoose.model('AdviceEntry', adviceEntrySchema); 
module.exports = {AdviceEntry};