require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Export config object
module.exports = {
  // Specify Solidity Compiler version
  solidity: "0.8.19",
  etherscan: {
    apiKey: {
      sonictest: "placeholder", // apiKey is not required, just set a placeholder
    },
    customChains: [
      {
        network: "sonictest",
        chainId: 64165,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/64165/etherscan",
          browserURL: "https://scan.soniclabs.com"
        }
      }
    ]
  },
  networks: {
    sonictest: {
      url: "https://rpc.testnet.soniclabs.com",
      accounts: [process.env.SONIC_PRIVATE_KEY],
      chainId: 64165 // Sonic testnet chain ID
    }
  }
}