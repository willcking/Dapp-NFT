require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

task( 'account', 'Prints the list of account', async () => {
  const accounts = await ethers.getSigners();

  for(const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/' + process.env.ALCHEMY_KEY,
      accounts: [process.env.ACCOUNT_KEY],
    },
    holesky: {
      url: 'https://eth-holesky.g.alchemy.com/v2/' + process.env.ALCHEMY_KEY,
      accounts:[process.env.ACCOUNT_KEY],
    },
  },
};
