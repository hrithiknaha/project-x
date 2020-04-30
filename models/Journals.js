const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	prologue: {
		type: String,
		required: true,
		max: 90
	},
	genre: {
		type: String,
		required: true
	},
	writtenAt: {
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});
module.exports = mongoose.model('Journals', journalSchema);
