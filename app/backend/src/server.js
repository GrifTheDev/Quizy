const express = require("express")
const app = express()
const findLocalIp = require("./utils/findLocalIp");
let port = 3000

function backend() {
  console.log("starting on port " + port);
  app.get('/', async (req, res) => {
    res.sendStatus(200)
    res.send("Hello World")
  })
  
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on ${port}. Go to http://${findLocalIp()}:${port}.`)
  })
}

backend();
process.on("uncaughtException", (error) => {
  // Detecting if the port is already in use.
  if (error.message.split(" ").includes("EADDRINUSE:")) {
    console.log(`Detected that port ${port} is already in use, trying port ${port + 1}.`);
    port++;
    backend();
  }
});

