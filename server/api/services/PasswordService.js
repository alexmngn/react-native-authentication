/**
 * PasswordService
 */

const bcrypt = require('bcrypt');

module.exports = {
	encryptPassword(password) {
		return new Promise((resolve, reject) => {
			bcrypt.genSalt(10, (genSaltErr, salt) => {
				if (genSaltErr) return reject(genSaltErr);

				bcrypt.hash(password, salt, (hashErr, hash) => {
					if (hashErr) return reject(hashErr);
					resolve(hash);
				});
			});
		});
	},
};
