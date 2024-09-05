require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infurahol",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    infurahol: {
      url: "https://sepolia.infura.io/v3/887666071b1844899a3865952de8e7bf",
      accounts: [
        process.env.private_key,
      ],
    },
  },
  solidity: "0.8.20",
};
