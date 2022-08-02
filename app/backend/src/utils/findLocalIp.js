// Yes this is from Stack Overflow: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
"use strict";

const { networkInterfaces } = require("os");
function findLocalIp() {
  const nets = networkInterfaces();
  const results = Object.create(null); 

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return results["Wi-Fi"][0];
}

module.exports = findLocalIp