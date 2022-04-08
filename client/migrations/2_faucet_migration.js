const Faucet = artifacts.require("Faucet");
//gets byte code of smart contract.

module.exports = function (deployer) {
    deployer.deploy(Faucet)
}