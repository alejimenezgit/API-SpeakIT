const express = require('express');
const router  = express.Router();
const Comunication   = require('../models/Comunication');
const Users   = require('../models/User');

/*
	path:    /comunication/all
	dscrip:  get all the comunication
*/
router.get('/all', async (req, res, next) => {
	try{
		const comunication = await Comunication.find();
		if (comunication) {
			return res.json(comunication);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /comunication/add
	dscrip:  add an comunication
	body:    all params (body)
*/
router.post('/add',  async (req, res, next) => {
	const comunication = new Comunication(req.body);
	try{
		const savedComunitation = await comunication.save();
		if (savedComunitation) {
			return res.json(savedComunitation);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /comunication/allByIds
	dscrip:  get all Comunications by User
	body:    all params (body)
*/
router.get('/allByIds/:id', async (req, res, next) => {
	try{
		const i = await Users.findById(req.params.id);
		console.log(i);
		
		const comunication = await Users.findById(req.params.id).populate('comunications').exec((err,posts) => {console.log(posts)})
		if (comunication) {
			return res.json(comunication);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /comunication/update
	dscrip:  update an comunication
	body:    all params (body)
*/
router.put('/update/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const comunication = await Comunication.findByIdAndUpdate(id,req.body);
		if (comunication) {
			/*const userUpdated = await Users.findOne({ email })*/
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /comunication/delete
	dscrip:  delete an comunication
	body:    all params (body)
*/
router.delete('/delete/:id', async (req, res, next) => {
	try{
		const comunication = await Comunication.findByIdAndRemove(req.params.id);
		if (comunication) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /comunication/
	dscrip:  get an comunication
	body:    language
*/
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const comunication = await Comunication.findById(id);
		if (comunication) {
			return res.json(comunication);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

module.exports = router;