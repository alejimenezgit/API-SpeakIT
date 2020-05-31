const mongoose = require('mongoose');
const { Schema } = mongoose;

const comunicationSchema = new Schema({
    sender:     {type: mongoose.Schema.Types.ObjectId, required: true},
    receiver:   {type: mongoose.Schema.Types.ObjectId,  required: true},
    status:     {type: String, required: true},
    chat:       {type: Array, receiver: true}
});

const Comunication = mongoose.model('Comunication', comunicationSchema);
module.exports = Comunication;