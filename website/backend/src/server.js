const express = require("express");
const config = require("../../../config");
const findLocalIp = require("./utils/findLocalIp");
const cors = require("cors")
const fs = require("fs")
const { serverLogger } = require("./utils/serverLogger");
const path = require("path");

let port = config.port
const app = express()


function backend() {
  serverLogger.info(`Attempting to start the web server on port ${port}.`);
  app.get('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.sendStatus(200)
  })
  
  app.listen(port, "0.0.0.0", () => {
    serverLogger.info(`The web server has been successfully started on port ${port} and is listening for requests. Access it on http://${findLocalIp()}:${port}.`);
  })

  /*
    Yes, this is dumb and I hate it, however React does not allow for importing outside the src directory, 
    so this just writes the web server address into a file for me to be able to make requests to it
    from the frontend.
  */
  fs.writeFileSync(path.join(__dirname + "../../../frontend/src/address.json"), JSON.stringify({
    address: `http://${findLocalIp()}:${port}`
  }))
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

