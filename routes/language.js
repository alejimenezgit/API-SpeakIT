const express = require('express');
const router  = express.Router();
const Language   = require('../models/Language');


/*
	path:    /language/
	dscrip:  get an language
	body:    language
*/
router.post('/:id',  async (req, res, next) => {
	//const { id } = req.body;
	try{
		const language = await Language.findOne({ id });
		if (language) {
			return res.json(uselanguager);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});


/*
	path:    /language/all
	dscrip:  get all the language
*/
router.get('/all',  async (req, res, next) => {
	try{
		const languages = await Language.find();
		if (languages) {
			return res.json(languages);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});


/*
	path:    /language/add
	dscrip:  add an language
	body:    all params (body)
*/
router.post('/add',  async (req, res, next) => {
	const languages = new Language(req.body);
	try{
		await languages.save();
		if (languages) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /language/update
	dscrip:  update an language
	body:    all params (body)
*/
router.put('/update/:id', async (req, res, next) => {
	const { language } = req.body;
	const conditions = { language: language};

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
router.delete('/delete/:id', async (req, res, next) => {
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