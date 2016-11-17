/* global Users, Tokens */

const bcrypt = require('bcrypt');
const moment = require('moment');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;

passport.serializeUser((user, next) =>
	next(null, user.id)
);

passport.deserializeUser((id, next) =>
	Users.findOne({ id }, (err, user) => {
		next(err, user);
	})
);

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients. They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens. The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate. Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header). While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(
	new BasicStrategy(
		(email, password, next) =>
			Users.findOne({
				email,
			}).exec((findErr, user) => {
				if (findErr) {
					return next(findErr);
				} else if (!user) {
					return next(401);
				}

				return bcrypt.compare(password, user.password, (bcryptErr, res) => {
					if (bcryptErr) {
						return next(bcryptErr);
					} else if (!res) {
						return next(401);
					}
					return next(null, user);
				});
			})
	)
);


/**
 * BearerStrategy
 *
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).  The user must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(
	new BearerStrategy(
		(tokenValue, next) => {
			Tokens.findOne({ value: tokenValue, type: 'access' }, (findErr, userToken) => {
				if (findErr) {
					return next(findErr);
				} else if (!userToken) {
					return next();
				}

				if (moment(userToken.expiresAt).unix() < moment().unix()) {
					Tokens.destroy({ value: tokenValue, type: 'access' }).exec();
					return next();
				}

				Users.findOne({
					id: userToken.user,
				}).exec((userErr, user) => {
					if (userErr) {
						return next(userErr);
					}
					return next(null, user);
				});
			});
		}
	)
);
