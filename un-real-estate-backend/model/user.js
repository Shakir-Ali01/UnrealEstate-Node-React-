const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  emailId: {
    type: String,
    unique: true,
    required: true,
  },
  mobileNo: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  propertiesOwned: {
    type: [mongoose.SchemaTypes.String],
    ref: "Property",
  },
  propertiesRented: {
    type: [mongoose.SchemaTypes.String],
    ref: "Property",
  },
  agentBookings: {
    type: [mongoose.SchemaTypes.String],
    ref: "Property",
  },
  createdAt: {
    type: String,
  },
});

const UserModel = mongoose.model("User", userSchema);
(async () => {
  await UserModel.init();
})();

module.exports = UserModel;
