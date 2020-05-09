const Comunication  = require('../models/Comunication');
const mongoose      = require('mongoose');

const mongoUrlTest  = 'mongodb+srv://alejandro:jimenez@cluster0-9vlcr.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/users';

let comunication = [
    {
        language: "5eb4615d1d2cfb44731638e0",
        user: ['5eb31bf296bb9a77354ea425']
    }
];

mongoose
  .connect(mongoUrlTest, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Comunication.create(comunication)
    console.log('created')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });