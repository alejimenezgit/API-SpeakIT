const express = require('express');
const router  = express.Router();
const Language   = require('../models/Language');

router.get('/all', function(req, res) {
	Language.find()
		.then(languages => {
			res.json({
				languages
			});
		})
		.catch(() => {});
});

module.exports = router;