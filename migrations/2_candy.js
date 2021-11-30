const Candy = artifacts.require("Candy");

module.exports = function (deployer) {
  deployer.deploy(Candy);
};
