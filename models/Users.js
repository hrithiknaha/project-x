const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
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
	dateCreates: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.Schema('Users', userSchema);
