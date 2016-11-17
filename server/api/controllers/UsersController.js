/* global Users */
/**
 * UsersController
 */

module.exports = {
	create(req, res) {
		Users.add(req.allParams(), (err, user) => {
			if (err) {
				return res.negotiate(err);
			}
			return res.created({ user });
		});
	},

	getAll(req, res) {
		Users.find().exec((err, users) => {
			if (err) {
				return res.negotiate(err);
			}
			return res.ok({ users });
		});
	},
};
