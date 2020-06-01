const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Users   = require('../models/User');
const Comunication   = require('../models/Comunication');
const { checkUserEmpty, checkIfLoggedIn } = require('../middlewares');
const bcryptSalt = 10;

// checkIfLoggedIn

/*
	path:    /user/logout
	dscrip:  disconnect the user session
*/
router.get('/logout', (req, res, next) => {
	req.session.destroy(err => {
		if (err) {
			next(err);
		}
		return res.status(204).send();
	});
});

/*
	path:    /user/whouseris
	dscrip:  if user is connected
*/
router.get('/whouseris', (req, res, next) => {
	if (req.session.currentUser) {
		const { _id, name, surnames, email, nativeLanguages, comunications } = req.session.currentUser;
		console.log(req.session.currentUser)
		res.status(200).json({ _id, name, surnames, email, nativeLanguages, comunications } );
	} else {
		res.status(401).json({ code: 'unauthorized' });
	}
});

/*
	path:    /user/random
	dscrip:  get a random user
*/
router.get('/random',  async (req, res, next) => {
	try{
		const users = await Users.find();
		if (users) {
			const rndnum = Math.floor(Math.random() * users.length) 
			return res.json(users[rndnum]);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/all
	dscrip:  get an user
*/

router.post('/allbyLanguage',  async (req, res, next) => {
	console.log(req.body)
	try{
		const user = await Users.find({nativeLanguages: req.body.nativeLanguages});
		//console.log(user)
		if (user) {
			return res.json(user);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/all
	dscrip:  get an user
*/

router.get('/all',  async (req, res, next) => {
	try{
		const user = await Users.find();
		if (user) {
			return res.json(user);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});




/*
	path:    /user/add
	dscrip:  add an user
	body:    all params (body)
*/
router.post('/add', async (req, res, next) => {
	const { name, surnames, email, password, nativeLanguages, comunications } = req.body;
	const newUser = new Users(req.body);
	try{
		const user = await Users.findOne({ email });
		if (user) {
			return res.status(422).json({ code: 'username-not-unique' });
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		newUser.password = bcrypt.hashSync(password, salt);
		await newUser.save();
		if (newUser) {
			req.session.currentUser = newUser;
			const userRegistered = await Users.findOne({ email });
			return res.json(userRegistered);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/pushMash
	dscrip:  update an user
	body:    all params (body)
*/
router.put('/pushMatch/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const user = await Users.findByIdAndUpdate(id,{$push: {match: req.body}});
		if (user) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});
 
/*
	path:    /user/pushComunication
	dscrip:  update an user
	body:    all params (body)
*/
router.put('/pushComunication/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const user = await Users.findByIdAndUpdate(id,{$push: {comunications: req.body}});
		if (user) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/update
	dscrip:  update an user
	body:    all params (body)
*/
router.put('/update/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const user = await Users.findByIdAndUpdate(id,req.body);
		if (user) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/createMatch
	dscrip:  update an user
	body:    all params (body)
*/
router.post('/createMatch', async (req, res, next) => {
	const comunication = new Comunication(req.body);
	try{
		const savedComunitation = await comunication.save();
		if (savedComunitation) {
			const firstUser = await Users.findByIdAndUpdate(comunication.sender,{$push: {comunications: comunication._id}} );
			const secondUser = await Users.findByIdAndUpdate(comunication.receiver,{$push: {comunications: comunication._id} });
			if (firstUser && secondUser) 
				return res.json("done");
		}
			return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});



/*
	path:    /user/delete
	dscrip:  delete an user
	body:    all params (body)
*/
router.delete('/delete/:id', async (req, res, next) => {
	try{
		const user = await Users.findByIdAndRemove(req.params.id);
		if (user) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/
	dscrip:  get an user
	body:    email, password
*/
router.post('/oneUserMatches/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		let user = await Users.findById(id).populate('comunications');
		if (user) {
			let { comunications } = user;
			let statusByIs = []
			let allIds = comunications.map((com,index) => {
				if(req.body.status === 'match' && com.status !== 'match' && com.status !== 'delete'){

					if(com.sender == req.session.currentUser._id){
						return (statusByIs.push({ id: com.receiver, status: com.status, idCom: com._id, chat: com.chat }),
						mongoose.Types.ObjectId(com.receiver) )
					}
					
					else 
						if (com.status === 'match') {
							statusByIs.push({ id: com.sender,status: 'match', idCom: com._id, chat: com.chat }) }
						else{
							statusByIs.push({ id: com.sender,status: 'addOrNot', idCom: com._id, chat: com.chat })
						}

						return mongoose.Types.ObjectId(com.sender)
				}
				else if (req.body.status === 'done' && com.status === 'match') {
					console.log('entra..--------------------------- 1 ', com.sender, req.session.currentUser._id)
					if(String(com.sender) === String(req.session.currentUser._id)) {
						console.log('entra..--------------------------- 2', com.sender, req.session.currentUser._id)
						statusByIs.push({ id: com.receiver, status: 'done', idCom: com._id, chat: com.chat })
						return mongoose.Types.ObjectId(com.receiver)
					}
					else {
						console.log('entra..--------------------------- 3', com.sender, req.session.currentUser._id)
						statusByIs.push({ id: com.sender,status: 'done', idCom: com._id, chat: com.chat })
						return mongoose.Types.ObjectId(com.sender)
					}
						
				}
			})

			let usersMathc = await Users.find({'_id': {$in: allIds }}).populate('comunications');
			
			let userWithStatus = [];

			usersMathc.forEach(function(user) {
				statusByIs.forEach(function(status){
					let userID = user._id;
					let statusID = status.id;
					if(String(userID) ===  String(statusID)) {
						let u  = {
							id: user._id,
							name: user.name,
							surnames: user.surnames,
							state: status.status,
							nativeLanguages: user.nativeLanguages,
							idCom: status.idCom,
							chat: status.chat
						}
						userWithStatus.push(u);
					}
				})
			});
			console.log(userWithStatus);
			return res.json(userWithStatus);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/
	dscrip:  get an user
	body:    email, password
*/
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const user = await Users.findById(id);
		if (user) {
			const { _id, name, surnames, email, nativeLanguages, comunications } = user
			return res.json( {_id, name, surnames, email, nativeLanguages, comunications } );
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /user/
	dscrip:  get an user
	body:    email, password
*/
router.post('/', checkUserEmpty, async (req, res, next) => {
	const { email,password } = res.locals.auth;
	try{
		const user = await Users.findOne({ email });
		if (user && bcrypt.compareSync(password, user.password)) {
				req.session.currentUser = user;
				return res.json(user);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});



module.exports = router;