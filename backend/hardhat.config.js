require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sonictest: {
      url: "https://rpc.testnet.soniclabs.com",
      accounts: [process.env.SONIC_PRIVATE_KEY],
      chainId: 64165
    }
  }
};