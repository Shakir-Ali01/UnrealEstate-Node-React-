const UserModel = require('../model/user');
const PropModel = require('../model/property');
const { addMonth } = require('../utilities/helper');

// seeding initial data

const createData = async (req, res, next) => {
	try {
		let delUser = await UserModel.deleteMany();
		if (delUser.deletedCount > 0) {
			console.log('Deleted all users');
		}
		let newUsers = await UserModel.create([
			{
				_id: '2',
				username: 'yushi',
				emailId: 'yushi@test.com',
				mobileNo: 1234567891,
				name: 'Yushi',
				role: 'Owner',
				gender: 'Female',
				password: '123',
				propertiesOwned: ['102', '104'],
				createdAt: new Date(),
			},
			// {
			// 	_id: '4',
			// 	username: 'lovesharan',
			// 	emailId: 'lss@gmail.com',
			// 	mobileNo: 8527430694,
			// 	name: 'Love Sharan',
			// 	role: 'Owner',
			// 	gender: 'Male',
			// 	password: '123',
			// 	propertiesOwned: ['103', '105'],
			// 	createdAt: new Date(),
			// },
			// {
			// 	_id: '5',
			// 	username: 'demo',
			// 	emailId: 'demo@gmail.com',
			// 	mobileNo: 8527430698,
			// 	name: 'Demo',
			// 	role: 'agent',
			// 	gender: 'Male',
			// 	password: '123',
			// 	propertiesRented: ['102', '104'],
			// 	createdAt: new Date(),
			// },
			// {
			// 	_id: '10',
			// 	username: 'owner',
			// 	emailId: 'owner@gmail.com',
			// 	mobileNo: 1234567810,
			// 	name: 'Owner',
			// 	role: 'Owner',
			// 	gender: 'Male',
			// 	password: '123',
			// 	propertiesOwned: ['100', '101'],
			// 	createdAt: new Date(),
			// },
			// {
			// 	_id: '9',
			// 	username: 'agent2',
			// 	emailId: 'agent2@gmail.com',
			// 	mobileNo: 1234767821,
			// 	name: 'Agent 2',
			// 	role: 'agent',
			// 	gender: 'Male',
			// 	password: '123',
			// 	propertiesOwned: [],
			// 	createdAt: new Date(),
			// 	agentBookings: [],
			// },
			// {
			// 	_id: '11',
			// 	username: 'agent',
			// 	emailId: 'agent@gmail.com',
			// 	mobileNo: 1234767891,
			// 	name: 'Agent',
			// 	role: 'agent',
			// 	gender: 'Male',
			// 	password: '123',
			// 	propertiesOwned: [],
			// 	createdAt: new Date(),
			// 	agentBookings: [],
			// },
			// {
			// 	_id: '12',
			// 	username: 'tenant',
			// 	emailId: 'tenant@gmail.com',
			// 	mobileNo: 1234567892,
			// 	name: 'Tenant',
			// 	role: 'Tenant',
			// 	gender: 'Male',
			// 	password: '123',
			// 	propertiesOwned: [],
			// 	propertiesRented: [],
			// 	createdAt: new Date(),
			// },
		]);
		console.log('users added');
		let del = await PropModel.deleteMany();
		if (del.deletedCount > 0) {
			console.log('Properties deleted');
		}
		let newProperties = await PropModel.create([
			{
				_id: '100',
				title: 'Property Seed One',
				city: 'Chandigarh',
				area: 500,
				description:
					'A place in Chandigarh. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempora facilis laboriosam? Numquam temporibus voluptates et maiores vero optio consequuntur, soluta beatae accusamus quaerat iste iure! Voluptatum temporibus quisquam officiis itaque quas aut incidunt. Earum deleniti vero architecto velit tempora quia ipsam, sunt voluptatem beatae, pariatur repudiandae rerum nam veritatis.',
				amenities: ['WiFi', 'AC', 'TV'],
				address: {
					base: 'H. No. 001',
					locality: 'Sector 1',
					city: 'Chandigarh',
					zip: 123123,
					state: 'Punjab',
				},
				owner: '10',
				rent: 25000,
				createdAt: new Date(),
			},
			{
				_id: '101',
				title: 'Property Seed Two',
				city: 'Delhi',
				area: 400,
				description:
					'A place in Delhi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempora facilis laboriosam? Numquam temporibus voluptates et maiores vero optio consequuntur, soluta beatae accusamus quaerat iste iure! Voluptatum temporibus quisquam officiis itaque quas aut incidunt. Earum deleniti vero architecto velit tempora quia ipsam, sunt voluptatem beatae, pariatur repudiandae rerum nam veritatis.',
				amenities: [
					'WiFi',
					'AC',
					'TV',
					'Parking',
					'Pets Allowed',
					'Kitchen',
					'Heater',
					'Security Cameras',
				],
				address: {
					base: 'H. No. 001',
					locality: 'Random Vihar',
					city: 'Delhi',
					zip: 123123,
					state: 'Delhi-NCR',
				},
				owner: '10',
				rent: 20000,
				createdAt: new Date(),
			},
			{
				_id: '102',
				title: 'Property Seed Three',
				city: 'Jaipur',
				area: 1000,
				description:
					'A place in Jaipur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempora facilis laboriosam? Numquam temporibus voluptates et maiores vero optio consequuntur, soluta beatae accusamus quaerat iste iure! Voluptatum temporibus quisquam officiis itaque quas aut incidunt. Earum deleniti vero architecto velit tempora quia ipsam, sunt voluptatem beatae, pariatur repudiandae rerum nam veritatis.',
				amenities: [
					'WiFi',
					'Air Con',
					'TV',
					'Parking',
					'Pets Allowed',
					'Kitchen',
					'Heater',
					'Security Cameras',
					'Office Space',
				],
				address: {
					base: 'H. No. 001',
					locality: 'Random Samaaj',
					city: 'Jaipur',
					zip: 123123,
					state: 'Rajasthan',
				},
				owner: '2',
				rent: 40000,
				createdAt: new Date(),
			},
			{
				_id: '103',
				title: 'Property Seed Four',
				city: 'Gurugram',
				area: 300,
				description:
					'A place in Gurugram. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempora facilis laboriosam? Numquam temporibus voluptates et maiores vero optio consequuntur, soluta beatae accusamus quaerat iste iure! Voluptatum temporibus quisquam officiis itaque quas aut incidunt. Earum deleniti vero architecto velit tempora quia ipsam, sunt voluptatem beatae, pariatur repudiandae rerum nam veritatis.',
				amenities: [
					'WiFi',
					'Parking',
					'Pets Allowed',
					'Kitchen',
					'Heater',
					'Security Cameras',
					'Theatre',
				],
				address: {
					base: 'H. No. 001',
					locality: 'Random Sector',
					city: 'Gurugram',
					zip: 123123,
					state: 'Delhi-NCR',
				},
				owner: '4',
				rent: 100000,
				createdAt: new Date(),
			},
			{
				_id: '104',
				title: 'Property Seed Five',
				city: 'Sikar',
				area: 400,
				description:
					'A place in Sikar. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempora facilis laboriosam? Numquam temporibus voluptates et maiores vero optio consequuntur, soluta beatae accusamus quaerat iste iure! Voluptatum temporibus quisquam officiis itaque quas aut incidunt. Earum deleniti vero architecto velit tempora quia ipsam, sunt voluptatem beatae, pariatur repudiandae rerum nam veritatis.',
				amenities: [
					'WiFi',
					'Parking',
					'Hammock',
					'Pets Allowed',
					'Kitchen',
					'Heater',
					'Security Cameras',
				],
				address: {
					base: 'H. No. 001',
					locality: 'Random Gaon',
					city: 'Sikar',
					zip: 123123,
					state: 'Rajasthan',
				},
				owner: '2',
				rent: 10000,
				createdAt: new Date(),
			},
		]);
		console.log('properties added');
		res.json({
			users: newUsers,
			properties: newProperties,
		});
	} catch (err) {
		next(err);
	}
};

const getData = async (req, res, next) => {
	try {
		// let users = await UserModel.find({}).populate("propertiesOwned");
		let users = await UserModel.find({});
		let properties = await PropModel.find({});
		// let properties = await PropModel.find({}).populate("owner");
		res.status(200).json({
			users: users,
			properties: properties,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = { createData, getData };
