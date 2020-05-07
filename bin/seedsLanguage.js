const Language         = require('../models/Language');
const mongoose      = require('mongoose');

const mongoUrlTest  = 'mongodb+srv://alejandro:jimenez@cluster0-9vlcr.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/users';

let languages = [
    {
        language: "español",
    }
];

mongoose
  .connect(mongoUrlTest, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Language.create(languages)
    console.log('created Language')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
