const express  = require('express');
const router   = express.Router();
const Language = require('../models/Language');


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

router.post('/allById',  async (req, res, next) => {
	try{
		const allLanguages = await Language.find({'_id': {$in: req.body }})
		console.log(allLanguages)
		if (allLanguages) {
			return res.json(allLanguages);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

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