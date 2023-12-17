// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre
// }
const { network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const accounts = await ethers.getSigners();
  const addresses = [
    accounts[0].address,
    accounts[1].address,
    accounts[2].address,
    accounts[3].address,
    accounts[4].address,
    accounts[5].address,
  ];

  const distribute = await deploy("Distribute", {
    from: deployer,
    args: [addresses],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`Distribute deployed at ${distribute.address} for ${deployer}`);
};
module.exports.tags = ["all", "distribute"];
