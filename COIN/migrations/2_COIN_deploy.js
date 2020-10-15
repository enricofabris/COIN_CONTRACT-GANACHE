const COIN = artifacts.require("COIN");

module.exports = function(deployer) {
  deployer.deploy(COIN);
};
