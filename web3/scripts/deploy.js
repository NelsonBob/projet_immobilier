
const { deployments  } = require("hardhat");
const  hre  = require("hardhat");


async function main() {

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  const Marketplace = await hre.ethers.getContractFactory("MarketPlace");

  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();

  console.log(
    `marketplace with 1 ETH and unlock timestamp ${unlockTime} deployed to ${marketplace.address}`
  );


  // // Deploy the contract
  // const deployed = await marketplace.deploy();

  // // Log the contract's address
  // console.log("MarketPlace contract address:", deployed.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {

    console.error(error);
    process.exit(1);
  });
