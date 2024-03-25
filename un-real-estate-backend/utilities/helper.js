const UserModel = require('../model/user');
const PropModel = require('../model/property');

// generate user Id
const generateUserId = async () => {
	let users = await UserModel.find();
	if (users.length > 0) {
		let noOfUsers = users.length;
		const lastUserId = users[noOfUsers - 1]._id;
		console.log('last user id - ', lastUserId);
		let newUserId = `${Number(lastUserId) + 1}`;
		console.log('new user id - ', newUserId);
		return newUserId;
	} else {
		return '1';
	}
};

// generate property id
const generatePropId = async () => {
	let properties = await PropModel.find();
	if (properties.length > 0) {
		let noOfProperties = properties.length;
		const lastPropId = properties[noOfProperties - 1]._id;
		console.log(typeof lastPropId, lastPropId);
		let newPropId = Number(lastPropId) + 1;
		return newPropId;
	} else {
		return `1`;
	}
};

function addMonth(date, months = 1) {
	var d = date.getDate();
	date.setMonth(date.getMonth() + months);
	if (date.getDate() !== d) {
		date.setDate(0);
	}
	return date;
}

module.exports = {
	generateUserId,
	generatePropId,
	addMonth,
};
