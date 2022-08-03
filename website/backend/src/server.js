const express = require("express")
const app = express()
const findLocalIp = require("./utils/findLocalIp");
const { serverLogger } = require("./utils/serverLogger");
let port = 3000

function backend() {
  serverLogger.info(`Attempting to start the web server on port ${port}.`);
  app.get('/', async (req, res) => {
    res.sendStatus(200)
    res.send("Hello World")
  })
  
  app.listen(port, "0.0.0.0", () => {
    serverLogger.info(`The web server has been successfully started on port ${port} and is listening for requests.`);
  })
}

backend();
process.on("uncaughtException", (error) => {
  // Detecting if the port is already in use.
  if (error.message.split(" ").includes("EADDRINUSE:")) {
    serverLogger.warn(`There is already a web server running on port ${port}, attemtping the next port.`);
    port++;
    backend();
  }
});

