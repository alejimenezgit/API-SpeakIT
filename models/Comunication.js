const mongoose = require('mongoose');
const { Schema } = mongoose;

const comunicationSchema = new Schema({
    language:  {type: String, required: true},
    user:      {type: Array,  required: true}
});

const Comunication = mongoose.model('Comunication', comunicationSchema);
module.exports = Comunication;