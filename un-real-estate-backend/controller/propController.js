const PropModel = require('../model/property');
const UserModel = require('../model/user');
const { generatePropId, addMonth } = require('../utilities/helper');

const getProperties = async (req, res, next) => {
	try {
		let properties = await PropModel.find({})
			.populate('owner')
			.populate('tenant')
			.populate('agent');
		res.status(200).json(properties);
	} catch (err) {
		next(err);
	}
};

const getOneProperty = async (req, res, next) => {
	try {
		let property = await PropModel.findOne({ _id: req.params.propId })
			.populate('owner')
			.populate('tenant');
		res.status(200).json(property);
	} catch (err) {
		next(err);
	}
};

const getRentDue = async (req, res, next) => {
	try {
		const { tenantId } = req.query;
		let response = await PropModel.find({});
		// console.log("response received: ", response);
		res.status(200).json(response.filter((item) => item.tenant === tenantId));
	} catch (err) {
		next(err);
	}
};

const addProperty = async (req, res, next) => {
	try {
		let user = await UserModel.findOne({ username: req.params.username });
		if (!user) {
			let err = new Error('Invalid User!');
			err.status = 401;
			throw err;
		} else if (user.role.toLowerCase() !== 'owner') {
			let err = new Error('You are not an owner!');
			err.status = 401;
			throw err;
		} else {
			let newPropId = await generatePropId();
			let newProperty = await PropModel.create({
				...req.body,
				owner: user._id,
				_id: newPropId,
			});
			user.propertiesOwned.push(newProperty._id);
			await user.save();
			res.status(200).json(newProperty);
		}
	} catch (err) {
		next(err);
	}
};

const bookPropertyForTenant = async (req, res, next) => {
	try {
		let foundUser = await UserModel.findOne({ _id: req.body.tenantId });
		if (foundUser.role.toLowerCase() !== 'tenant') {
			let err = new Error('Invalid Tenand Id');
			err.status = 401;
			throw err;
		} else {
			let foundProperty = await PropModel.findOneAndUpdate(
				{ _id: req.params.propertyId },
				{ tenant: req.body.tenantId, bookedOn: new Date().toLocaleString() },
				{ new: true }
			);
			foundUser.propertiesRented.push(foundProperty._id);
			foundUser.save();
			res.status(200).json(foundProperty);
		}
	} catch (err) {
		next(err);
	}
};

const updateProperty = async (req, res, next) => {
	try {
		let tenantId = null;
		let foundTenant = null;
		let agentId = null;
		let propId = null;
		let foundAgent = null;
		let updatedProperty = null;

		let response = `Something went Wrong`;
		console.log('action: ', req.body.action);
		switch (req.body.action) {
			case 'user requested booking':
				tenantId = req.query.tenantId;
				foundTenant = await UserModel.findOne({ _id: tenantId });
				foundAgent = await UserModel.findOne({ _id: req.query.agentId });
				if (foundTenant?.role.toLowerCase() !== 'tenant') {
					let err = new Error('You are not a Tenant!');
					err.status = 401;
					throw err;
				} else {
					updatedProperty = await PropModel.findOneAndUpdate(
						{ _id: req.params.propertyId },
						{
							status: 'Reserved',
							agent: req.query.agentId,
							tenant: tenantId,
							dueDate: addMonth(new Date(), +req.query.months),
						},
						{ new: true }
					);
					foundTenant.propertiesRented.push(updatedProperty._id);
					foundTenant.save();
					foundAgent.agentBookings.push(updatedProperty._id);
					foundAgent.save();
					response = updatedProperty;
				}
				break;
			case 'agent confirmed booking':
				updatedProperty = await PropModel.findOneAndUpdate(
					{ _id: req.params.propertyId },
					{ status: 'Booked' },
					{ new: true }
				);
				break;
			case 'update property details':
				updatedProperty = await PropModel.findOneAndUpdate(
					{ _id: req.params.propertyId },
					req.body,
					{ new: true }
				);
				if (!updatedProperty) {
					let err = new Error('Invalid Property ID!');
					err.status = 400;
					throw err;
				} else if (updatedProperty.title) {
					response = updatedProperty;
				} else {
					response = { message: 'Invalid Property Details!' };
				}
				break;
			case 'due date changed':
				let foundProperty = await PropModel.findOne({
					_id: req.params.propertyId,
				});
				foundProperty.dueDate = addMonth(
					new Date(foundProperty.dueDate),
					+req.query.months
				);
				foundProperty.save();
				response = foundProperty;
				break;
			case 'user cancelled request':
				let foundUser01 = await UserModel.findOne({ _id: req.query.tenantId });
				foundUser01.propertiesRented = foundUser01.propertiesRented.filter(
					(item) => item !== req.params.propertyId
				);
				foundUser01.save();
				foundAgent = await UserModel.findOne({ _id: req.query.agentId });
				foundAgent.agentBookings = foundAgent.agentBookings.filter(
					(item) => item !== req.params.propertyId
				);
				foundAgent.save();
				let property01 = await PropModel.findOneAndUpdate(
					{ _id: req.params.propertyId },
					{
						$unset: { tenant: 1, status: 1, agent: 1 },
					},
					{ new: true }
				);
				response = property01;
				break;
			case 'user cancelled booking':
				let foundUser = await UserModel.findOne({ _id: req.query.tenantId });
				foundUser.propertiesRented = foundUser.propertiesRented.filter(
					(item) => item !== req.params.propertyId
				);
				foundUser.save();
				foundAgent = await UserModel.findOne({ _id: req.query.agentId });
				foundUser.agentBookings = foundUser.agentBookings.filter(
					(item) => item !== req.params.propertyId
				);
				foundAgent.save();
				let property = await PropModel.findOneAndUpdate(
					{ _id: req.params.propertyId },
					{ $unset: { tenant: 1, dueDate: 1 } },
					{ new: true }
				);
				response = property;
				break;
			default:
				break;
		}
		res.status(200).json(response);
	} catch (err) {
		next(err);
	}
};

const deleteProperty = async (req, res, next) => {
	try {
		let foundUser = await UserModel.findOne({ _id: req.query.ownerId });
		if (foundUser.role.toLowerCase() !== 'owner') {
			let err = new Error('You are not an Owner!');
			err.status = 401;
			throw err;
		} else if (!foundUser.propertiesOwned.includes(req.params.propertyId)) {
			let err = new Error('You are not the Owner of this property!');
			err.status = 401;
			throw err;
		} else {
			let deletedProperty = await PropModel.deleteOne({
				_id: req.params.propertyId,
			});
			if (deletedProperty.deletedCount > 0) {
				const index = foundUser.propertiesOwned.indexOf(req.params.propertyId);
				if (index > -1) {
					foundUser.propertiesOwned.splice(index, 1);
				}
				foundUser.save();
				res.status(200).json(deletedProperty);
			} else {
				res.status(400).json({ message: 'Invalid Property ID!' });
			}
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getProperties,
	getRentDue,
	addProperty,
	updateProperty,
	bookPropertyForTenant,
	deleteProperty,
	getOneProperty,
};
