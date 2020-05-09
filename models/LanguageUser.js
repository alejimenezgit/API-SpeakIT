const mongoose = require('mongoose');
const { Schema } = mongoose;

const languageUserSchema = new Schema({
    language:  {type: String, required: true, unique: true},
    level:     {type: Number, required: true}
});

const languageUser = mongoose.model('languageUser', languageUserSchema);
module.exports = languageUser;