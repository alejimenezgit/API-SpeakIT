const express 			= require('express');
const router  			= express.Router();
const Comunication   	= require('../models/Comunication');
const Users   			= require('../models/User');


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


router.get('/allByIds/:id', async (req, res, next) => {
	try{
		const comunication = await Users.findById(req.params.id).populate('comunications');
		if (comunication) {
			var languages = comunication.comunications.map((comunication, index) => {
				return comunication.language;
			})
			return res.json(languages);
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});


router.put('/update/:id', async (req, res, next) => {
	const { id } = req.params;
	try{
		const comunication = await Comunication.findByIdAndUpdate(id,req.body);
		if (comunication) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

router.put('/pushComunication/:id', async (req, res, next) => {
	const { id } = req.params;
	console.log(id, req.body, '------------------------------------------------------------------------')
	try{
		const comunication = await Comunication.findByIdAndUpdate(id,{$push: {chat: req.body}});
		if (comunication) {
			return res.json("done");
		}
		return res.status(404).json({ code: 'not-found' });
	} catch(error) {
		next(error);
	}
});

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