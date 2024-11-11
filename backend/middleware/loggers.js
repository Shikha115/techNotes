const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); // : or as both works same, it creates a new universally unique identifiers
const fs = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileNamme) => {
  const dateTime = format(new Date(), "dd/MM/yyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const filePath = path.join(__dirname, "..", "logs", logFileNamme);

  try {
    // await fs.access(filePath);
    await fs.appendFile(filePath, logItem);
  } catch (error) {
    console.error(error);
  }
};


const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.get("origin")}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    //url = print path, origin = print only url
    next()
}

module.exports = { logEvents, logger }
