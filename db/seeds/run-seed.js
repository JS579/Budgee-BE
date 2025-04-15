const devData = require("../data/development_data/index.js");
const seed = require("./seed.js");

const runSeed = async () => {
  await seed(devData);
};

runSeed();

