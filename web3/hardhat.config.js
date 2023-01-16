/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
     defaultNetwork:'goerli',
   
    networks: {
      hardhat: {
        url: "http://localhost:8545"
      },
      goerli:{
          hardhat: {},
          goerli:'https://rpc.ankr.com/eth_goerli',
          accounts: [`0x${process.env.PRIVATE_KEY}`]
    
      },
      ropsten:{
          url: "https://ropsten.infura.io/v3/YOUR-PROJECT-ID",
          accounts: [
            "0x7e5f4552091a69125d5dfcb7b8c2659029395bdf",
            "0x2b5ad5c4795c026514f8317c7a215e218dccd6cf"
          ]
        }

    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
 
};
