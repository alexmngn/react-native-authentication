/* global sails, Clients */
/**
 * hasClientId policy
 */

module.exports = (req, res, next) => {
	Clients.find(req.headers['client-id']).exec((err) => {
		if (err) {
			return res.unauthorized();
		}
		return next();
	});
};
