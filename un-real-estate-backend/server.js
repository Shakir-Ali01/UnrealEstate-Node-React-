// package imports
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// local imports
const reqLogger = require("./utilities/reqLogger");
const errorLogger = require("./utilities/errorLogger");
const indexRouter = require("./routes/indexRoutes");
const userRouter = require("./routes/userRoutes");
const propRouter = require("./routes/propRoutes");

// connection to local mongoDB server
mongoose.connect("mongodb://127.0.0.1:27017/UnrealEstate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

//middlewares
app.use(express.json()); // this is for parsing json from req.body
app.use(express.urlencoded({ extended: true })); // this is for something idk
app.use(cookieParser()); // this is for cookie session management

// routing middlewares and router
app.use(reqLogger);
app.use("/api", indexRouter);
app.use("/users", userRouter);
app.use("/properties", propRouter);
app.use(errorLogger);
app.listen(5000, () => {
  console.log("Server listening on Port 5000 - http://localhost:5000....");
});
