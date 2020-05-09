const express = require('express');
const router  = express.Router();
const Comunication   = require('../models/Comunication');

router.get('/all', function(req, res) {
	Comunication.find()
		.then(comunication => {
			res.json({
				comunication
			});
		})
		.catch(() => {});
});

module.exports = router;