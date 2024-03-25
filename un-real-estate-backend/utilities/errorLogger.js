const fs = require("fs");

const errorLogger = async (err, req, res, next) => {
  if (err) {
    console.log("Error: ", err);
    const errLogMessage = `${
      new Date().getDay() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear()
    } - ${err.message}\n`;
    fs.appendFile("errorLogger.log", errLogMessage, (error) => {
      if (error) console.log(error);
    });
    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    res.json({ error: err.message });
    next();
  }
};

module.exports = errorLogger;
