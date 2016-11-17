/* global Tokens */
/**
 * hasRefreshToken policy
 */

module.exports = (req, res, next) => {
	const params = req.allParams();
	if (!params.token || params.token.type !== 'refresh' || !params.user.id) {
		return res.unauthorized();
	}

	Tokens.findOne({
		type: params.token.type,
		value: params.token.value,
		user: params.user.id,
		expiresAt: { '>=': new Date() },
	}, (err, token) => {
		if (err) {
			return res.negotiate(err);
		} else if (!token) {
			return res.unauthorized();
		}
		return next();
	});
};
