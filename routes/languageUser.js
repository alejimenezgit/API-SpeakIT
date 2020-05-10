const express = require('express');
const router  = express.Router();
const LanguageUser   = require('../models/LanguageUser');

/*
	path:    /languageUser/all
	dscrip:  get all the languageUser
*/
router.get('/all', async (req, res, next) => {
	try{
		const languageUser = await LanguageUser.find();
		if (languageUser) {
			return res.json(languageUser);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /languageUser/add
	dscrip:  add an languageUser
	body:    all params (body)
*/
router.post('/add',  async (req, res, next) => {
	const languageUser = new LanguageUser(req.body);
	try{
		await languageUser.save();
		if (languageUser) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /languageUser/update
	dscrip:  update an languageUser
	body:    all params (body)
*/
router.put('/update/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const languageUser = await LanguageUser.findByIdAndUpdate(id,req.body);
		if (languageUser) {
			/*const userUpdated = await Users.findOne({ email })*/
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /languageUser/delete
	dscrip:  delete an languageUser
	body:    all params (body)
*/
router.delete('/delete/:id', async (req, res, next) => {
	try{
		const languageUser = await LanguageUser.findByIdAndRemove(req.params.id);
		if (languageUser) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /languageUser/
	dscrip:  get an languageUser
	body:    language
*/
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const languageUser = await LanguageUser.findById(id);
		if (languageUser) {
			return res.json(languageUser);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

module.exports = router;