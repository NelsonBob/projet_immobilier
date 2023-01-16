const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const MarketPlace = await ethers.getContractFactory("MarketPlace");

  // Deploy the contract
  const contract = await MarketPlace.deploy();
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
