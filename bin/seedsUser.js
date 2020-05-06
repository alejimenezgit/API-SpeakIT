const Users         = require('../models/User');
const mongoose      = require('mongoose');

const mongoUrlTest  = 'mongodb+srv://alejandro:jimenez@cluster0-9vlcr.mongodb.net/test?retryWrites=true&w=majority';
const mongoLocal    = 'mongodb://localhost/users';

let users = [
    {
        name: "alejandro",
        surnames: "jimenez",
        email: "alejandro01@gmail.com",
        password: "1234"
    }
];

mongoose
  .connect(mongoUrlTest, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Users.create(users)
    console.log('created')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
