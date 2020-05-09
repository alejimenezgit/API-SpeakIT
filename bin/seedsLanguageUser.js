const LanguageUser  = require('../models/LanguageUser');
const mongoose      = require('mongoose');

const mongoUrlTest  = 'mongodb+srv://alejandro:jimenez@cluster0-9vlcr.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/users';

let languageUser = [
    {
        language: "5eb4615d1d2cfb44731638e0",
        level: 2
    }
];

mongoose
  .connect(mongoUrlTest, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    LanguageUser.create(languageUser)
    console.log('created')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });