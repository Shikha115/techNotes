const { logEvents } = require("./loggers");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.get(
      "origin"
    )}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res
    .status(status)
    .json({
      status: "failure",
      data: "msg from error middleware",
      message: err.message,
    });
};

module.exports = errorHandler;
