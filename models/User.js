const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:               {type: String, required: true},
    surnames:           {type: String, required: true},
    email:              {type: String, required: true, unique: true},
    password:           {type: String, required: true},
    nativeLanguages:    {type: Array},
    comunications:      [{type: mongoose.Schema.Types.ObjectId, ref: 'Comunication'}]
});

const User = mongoose.model('User', userSchema);
module.exports = User;