const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/YOUR_PROJECT_ID"),
      network_id: 3,
      gas: 4465030,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.9",
    }
  }
};
