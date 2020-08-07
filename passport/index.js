const config = require('config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../db/db');
const User = db.models.users;
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtToken;

module.exports = passport => {
	// ---------------------------------------------------------------
	passport.use('jwt', new JWTStrategy(opts,
		async function (jwt_payload, done) {
			const getUser = await User.findOne({
				where: {
					id: jwt_payload.id,
					email: jwt_payload.email
				}
			});
			if (getUser) {
				return done(null, getUser.dataValues);
			}
			return done(null, false);
		}
	));
	passport.use('admininfo-jwt', new JWTStrategy(opts,
		async function (jwt_payload, done) {
			console.log('jwt_payload::',jwt_payload.id)
			const getUser = await User.findOne({
				where: {
					id: jwt_payload.id,
					// email: jwt_payload.email
				}
			});
			if (getUser) {
				console.log(getUser.dataValues);
				return done(null, getUser.dataValues);
			}
			return done(null, false);
		}
	));
	
}
