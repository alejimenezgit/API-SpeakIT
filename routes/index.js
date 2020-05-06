const express = require('express');
const router  = express.Router();
const Users   = require('../models/User');

router.get('/', function(req, res) {
	Users.find()
		.then(resorts => {
			console.log(resorts);
			res.json({
				resorts
			});
		})
		.catch(() => {});
});

module.exports = router;
