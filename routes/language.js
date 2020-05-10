const express  = require('express');
const router   = express.Router();
const Language = require('../models/Language');

/*
	path:    /language/all
	dscrip:  get all the language
*/
router.get('/all', async (req, res, next) => {
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
	const { id } = req.params;
	try{
		const language = await Language.findByIdAndUpdate(id,req.body);
		if (language) {
			/*const userUpdated = await Users.findOne({ email })*/
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /language/delete
	dscrip:  delete an language
	body:    all params (body)
*/
router.delete('/delete/:id', async (req, res, next) => {
	try{
		const language = await Language.findByIdAndRemove(req.params.id);
		if (language) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

/*
	path:    /language/
	dscrip:  get an language
	body:    language
*/
router.get('/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const language = await Language.findById(id);
		if (language) {
			return res.json(language);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});


module.exports = router;