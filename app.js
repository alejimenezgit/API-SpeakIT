const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const dbPath = process.env.MONGODB_URI;

mongoose
	.connect(dbPath, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((x) => {
		console.log(`Conected to ${x.connections[0].name}`);
	})
	.catch(error => {
		console.error(error);
	});

const userRouter = require('./routes/user');
const languageRouter = require('./routes/language');
const comunicationRouter = require('./routes/comunication');

const app = express();

app.use(cors( {
	credentials: true,
	origin: [process.env.FRONTEND_DOMAIN],
	}	
));

app.use(cookieParser());

app.use(
	session({
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 24 * 60 * 60, // 1 day
		}),
		secret: process.env.SECRET_SESSION,
		resave: true,
		saveUninitialized: true,
		name: 'speakit',
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/language', languageRouter);
app.use('/comunication', comunicationRouter);


app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
