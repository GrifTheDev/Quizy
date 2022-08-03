const { createLogger, format, transports } = require("winston")
const term = require("colorette")

const logFormat = format.printf(({ level, message, stack }) => {
  return `${term.magenta("SERVER")} ${term.yellow(">>")} [${level}]: ${stack || message}`;
});

const serverLogger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "website/logs/bot/errors.log", level: "error" }),
    new transports.File({ filename: "logs/bot/warns.log", level: "warn" }),
  ],
  exitOnError: true
});

module.exports = { serverLogger };
