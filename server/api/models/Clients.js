/**
 * Clients.js
 */

const uid = require('rand-token').uid;

const ID_LENGTH = 32;

module.exports = {

	autoPK: false,

	autoUpdatedAt: false,

	attributes: {
		id: {
			type: 'string',
			primaryKey: true,
			required: true,
		},

		name: {
			type: 'string',
			required: true,
		},
	},

	add(attrs, next) {
		return this.create({
			id: uid(ID_LENGTH),
			name: String(attrs.name).trim(),
		}).exec(next);
	},
};
