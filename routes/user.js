const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const Users   = require('../models/User');
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
		const { _id, name, surnames, email, nativeLanguages, comunications, match } = req.session.currentUser;
		console.log(req.session.currentUser)
		res.status(200).json({ _id, name, surnames, email, nativeLanguages, comunications, match } );
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
	const { name, surnames, email, password, nativeLanguages, comunications, match } = req.body;
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
	path:    /user/update
	dscrip:  update an user
	body:    all params (body)
*/
router.put('/update/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const user = await Users.findByIdAndUpdate(id,req.body);
		if (user) {
			/*const userUpdated = await Users.findOne({ email })*/
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
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const user = await Users.findById(id);
		if (user) {
			const { _id, name, surnames, email, nativeLanguages, comunications, match } = user
			return res.json( {_id, name, surnames, email, nativeLanguages, comunications, match } );
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