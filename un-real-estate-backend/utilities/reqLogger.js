const fs = require("fs");

const reqLogger = async (req, res, next) => {
  const logMessage = `A ${req.method} call was made to "${req.url}" on ${
    new Date().getDate() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getFullYear() +
    " at " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds()
  }\n`;
  fs.appendFile("reqLogger.log", logMessage, (error) => {
    if (error) console.log(error);
  });
  next();
};

module.exports = reqLogger;
