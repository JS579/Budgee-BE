const devData = require("../data/development-data/index.js");
const seed = require("./seed.js");
const connectDatabase = require("../connection.js");

const runSeed = async () => {
  await seed(devData);
  connectDatabase.end();
};

runSeed();

