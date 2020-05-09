const express = require('express');
const router  = express.Router();
const LanguageUser   = require('../models/LanguageUser');

router.get('/all', function(req, res) {
	LanguageUser.find()
		.then(languageUser => {
			res.json({
				languageUser
			});
		})
		.catch(() => {});
});

module.exports = router;