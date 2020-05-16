const checkIfLoggedIn = (req, res, next) => {
	if (req.session.currentUser) {
		next();
	} else {
		res.status(401).json({ code: 'unauthorized' });
	}
};

const checkUserEmpty = (req, res, next) => {
	const { email,password } = req.body;

	if (email !== '' && password !== '') {
		res.locals.auth = req.body;
		next();
	} else {
		res.status(422).json({ code: 'validation' });
	}
};

module.exports = {
	checkIfLoggedIn,
	checkUserEmpty,
};
