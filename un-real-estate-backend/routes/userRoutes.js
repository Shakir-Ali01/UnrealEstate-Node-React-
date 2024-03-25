var express = require('express');
const {
	getOneUser,
	getUsers,
	getAgents,
	getOneAgent,
	checkUserEmail,
	registerUser,
	checkUserMobileNo,
	checkUserName,
	loginUser,
	updateUser,
	checkUserMobileNoForUpdateProfile,
	checkUserEmailForUpdate,
} = require('../controller/userController');
var router = express.Router();

// ---- user routes ----
router.get('/', getUsers);
router.get('/agents', getAgents);
router.get('/agents/:agentId', getOneAgent);
router.get('/:userId', getOneUser);
router.get('/checkUserEmail/:emailId', checkUserEmail);
router.get('/checkUserMobileNo/:mobileNo', checkUserMobileNo);
router.get('/checkUserName/:userName', checkUserName);
router.get(
	'/checkMobileNoForUpdate/:mobileNo',
	checkUserMobileNoForUpdateProfile
);
router.get('/checkUserEmailForUpdate/:emailId', checkUserEmailForUpdate);

router.post('/', registerUser);
router.post('/login', loginUser);
// router/post("/users", loginUser);

router.put('/', updateUser);
// router.delete("/users", deleteUser);
// router.post("/users", logoutUser);

module.exports = router;
