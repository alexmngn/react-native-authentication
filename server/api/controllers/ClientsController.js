/* global Clients */
/**
 * ClientsController
 */

module.exports = {
	create(req, res) {
		Clients.add(req.allParams(), (err, client) => {
			if (err) {
				return res.negotiate(err);
			}
			return res.created({ client });
		});
	},
};
