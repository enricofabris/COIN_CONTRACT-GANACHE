const coin3 = artifacts.require("coin3");

module.exports = function(deployer) {
  deployer.deploy(coin3,{value:9000000000000000000});
};
