const mongoose = require('mongoose');
const propSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		unique: true,
		required: true,
	},
	owner: {
		type: mongoose.SchemaTypes.String,
		ref: 'User',
		required: true,
	},
	tenant: {
		type: mongoose.SchemaTypes.String,
		ref: 'User',
	},
	bookedOn: {
		type: Date,
	},
	description: {
		type: String,
		required: true,
	},
	amenities: {
		type: [String],
		required: true,
	},
	area: {
		type: Number,
		required: true,
	},
	address: {
		type: {
			base: String,
			locality: String,
			city: String,
			zip: Number,
			state: String,
		},
	},
	rent: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
	},
	agent: {
		type: mongoose.SchemaTypes.String,
		ref: 'User',
	},
	status: {
		type: String,
	},
	dueDate: {
		type: Date,
	},
});
const PropModel = mongoose.model('Property', propSchema);
(async () => {
	await PropModel.init();
})();

module.exports = PropModel;
