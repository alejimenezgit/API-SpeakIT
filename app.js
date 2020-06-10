const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const appSocket = require('express')();
const http = require('http').createServer(appSocket);
const io = require('socket.io').listen(http);

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
	
const app = express();

appSocket.use(cors( {
	origin: process.env.FRONTEND_DOMAIN,
	credentials: true
	}	
));
	
app.use(cors( {
	origin: process.env.FRONTEND_DOMAIN,
	credentials: true
	}	
));
	
const userRouter = require('./routes/user');
const languageRouter = require('./routes/language');
const comunicationRouter = require('./routes/comunication');

io.on('connection', function(socket){
	console.log(' a user connected');
	socket.on('chat message', function(msg){
		console.log('message' + JSON.stringify(msg));
		io.emit('chat message', msg);
	})
})

http.listen(3005, function(){
	console.log('listening on *:3002')
})


app.use(cookieParser());

app.use(
	session({
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
			ttl: 24 * 60 * 60, 
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
