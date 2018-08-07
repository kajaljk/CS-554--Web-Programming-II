const NRP = require("node-redis-pubsub");
const config = {
  port: 6379, // Port of your locally running Redis server
  scope: "people" // Use a scope to prevent two NRPs from sharing messages
};

const nrp = new NRP(config); // This is the NRP client
nrp.on("error", err => console.error(`Redis Error: ${err}`));

module.exports = nrp;
