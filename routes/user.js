const express = require('express');
const router  = express.Router();
const Users   = require('../models/User');

/*
	path:    /user/
	dscrip:  get an user
	body:    email
*/
router.post('/',  async (req, res, next) => {
	const { email } = req.body;
	try{
		const user = await Users.findOne({ email });
		if (user) {
			return res.json(user);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
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
			console.log(rndnum); 
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
router.post('/add',  async (req, res, next) => {
	const user = new Users(req.body);
	try{
		await user.save();
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
router.put('/update', async (req, res, next) => {
	const { email } = req.body;
	const conditions = { email: email};

	try{
		const user = await Users.update(conditions,req.body);
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
router.delete('/delete', async (req, res, next) => {
	const conditions = { email: req.body.email};
	try{
		const user = await Users.deleteOne(conditions);
		if (user) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

module.exports = router;