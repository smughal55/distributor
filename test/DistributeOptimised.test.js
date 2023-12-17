const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("DistributeOptimised", async function () {
  let distribute;
  let deployer;
  beforeEach(async function () {
    const addresses = [
      "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
      "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
      "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
      "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
      "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
      "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
    ];
    const DistributeFactory = await ethers.getContractFactory(
      "DistributeOptimised"
    );
    distribute = await DistributeFactory.deploy(addresses, {
      value: 0.5 * 10 ** 10,
    });
  });

  describe("distribute", async function () {
    it("distribution costs", async function () {
      await time.increase(1209600);
      const response = await distribute.distribute();
      const receipt = await response.wait();
      const gasUsed = receipt.gasUsed;
      console.log("gasUsed", gasUsed.toString());
    });
  });
});
