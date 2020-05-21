const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		// required: true,
		min: 8,
		max: 1024
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
