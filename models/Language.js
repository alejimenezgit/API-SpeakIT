const mongoose = require('mongoose');
const { Schema } = mongoose;

const languageSchema = new Schema({
    language:  {type: String, required: true, unique: true}
});

const Language = mongoose.model('Language', languageSchema);
module.exports = Language;