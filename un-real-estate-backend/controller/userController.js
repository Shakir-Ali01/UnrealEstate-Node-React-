const UserModel = require('../model/user');
const { generateUserId } = require('../utilities/helper');

// check userEmail Exist OR Not
const checkUserEmail = async (req, res, next) => {
	try {
		console.log(req.params.emailId);
		let foundUserEmail = await UserModel.find({ emailId: req.params.emailId });
		console.log(foundUserEmail);
		if (foundUserEmail.length >= 1) {
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}
	} catch (err) {
		next(err);
	}
};
// check userEmailFOrUpdateProfile Exist OR Not
const checkUserEmailForUpdate = async (req, res, next) => {
	try {
		console.log(req.params.emailId);
		const userId = req.query.userId;
		console.log(userId);
		let foundUserEmail = await UserModel.find({ emailId: req.params.emailId });
		console.log(foundUserEmail);
		if (foundUserEmail.length >= 1 && foundUserEmail[0]._id != userId) {
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}
	} catch (err) {
		next(err);
	}
};
// check userMobileNumberForUpdateProfile Exist OR Not
const checkUserMobileNoForUpdateProfile = async (req, res, next) => {
	console.log(req.params.mobileNo);
	//console.log(req.query.userId);
	const userId = req.query.userId;
	try {
		let foundUserMobileNo = await UserModel.find({
			mobileNo: req.params.mobileNo,
		});
		if (foundUserMobileNo.length >= 1 && foundUserMobileNo[0]._id != userId) {
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}
	} catch (err) {
		next(err);
	}
};
// check userMobileNumber Exist OR Not
const checkUserMobileNo = async (req, res, next) => {
	// console.log(req.params.mobileNo);
	try {
		let foundUserMobileNo = await UserModel.find({
			mobileNo: req.params.mobileNo,
		});
		if (foundUserMobileNo.length >= 1) {
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}
	} catch (err) {
		next(err);
	}
};
// check userMobileNumber Exist OR Not
const checkUserName = async (req, res, next) => {
	try {
		let foundUseruserName = await UserModel.find({
			username: req.params.userName,
		});
		if (foundUseruserName.length >= 1) {
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}
	} catch (err) {
		next(err);
	}
};

// get one user data
const getOneUser = async (req, res, next) => {
	try {
		let foundUser = await UserModel.findOne({ _id: req.params.userId })
			.populate('propertiesOwned')
			.populate('propertiesRented')
			.populate('agentBookings');
		if (foundUser) {
			res.status(200).json(foundUser);
		}
	} catch (err) {
		next(err);
	}
};

// get user data
const getUsers = async (req, res, next) => {
	try {
		let users = await UserModel.find();
		res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};

// get agents
const getAgents = async (req, res, next) => {
	try {
		let agents = await UserModel.find({ role: 'agent' }).populate(
			'agentBookings'
		);
		res.status(200).json(agents);
	} catch (err) {
		next(err);
	}
};

// get one agent
const getOneAgent = async (req, res, next) => {
	try {
		let foundAgent = await UserModel.findOne({
			_id: req.params.agentId,
		}).populate('agentBookings');
		if (foundAgent) {
			res.json(foundAgent);
		}
	} catch (err) {
		next(err);
	}
};

// allow login
const loginUser = async (req, res, next) => {
	try {
		let foundUser = await UserModel.findOne({
			username: req.body.username,
		}).populate('propertiesOwned');
		if (foundUser && foundUser.password) {
			if (foundUser.password === req.body.password) {
				res.cookie('username', foundUser.username);
				res.cookie('role', foundUser.role);
				res.status(200).json(foundUser);
			} else {
				let err = new Error('Password Incorrect');
				err.status = 401;
				throw err;
			}
		} else {
			let err = new Error('Not a valid username');
			err.status = 401;
			throw err;
		}
	} catch (err) {
		next(err);
	}
};

// register user
const registerUser = async (req, res, next) => {
	try {
		console.log(req.body);
		let newUserId = await generateUserId();
		let newUser = await UserModel.create({ ...req.body, _id: newUserId });
		res.status(200).json(newUser);
	} catch (err) {
		next(err);
	}
};

// edit user details
const updateUser = async (req, res, next) => {
	try {
		let updatedUser = await UserModel.findOneAndUpdate(
			{ username: req.body.username },
			req.body,
			{ new: true }
		);
		if (updatedUser.username) {
			res.status(200).json(updatedUser);
		} else {
			res.status(400).json({ message: 'Invalid User!' });
		}
	} catch (err) {
		next(err);
	}
};

// delete user
const deleteUser = async (req, res, next) => {
	try {
		let deletedUser = await UserModel.deleteOne({
			username: req.body.username,
		});
		if (deletedUser.deletedCount > 0) {
			res.status(200).json(deletedUser.username);
		} else {
			res.status(400).json({ message: 'Invalid User!' });
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getOneUser,
	getUsers,
	getAgents,
	getOneAgent,
	checkUserEmail,
	loginUser,
	registerUser,
	updateUser,
	deleteUser,
	checkUserMobileNo,
	checkUserName,
	checkUserMobileNoForUpdateProfile,
	checkUserEmailForUpdate,
};
