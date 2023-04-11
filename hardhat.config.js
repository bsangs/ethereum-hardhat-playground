/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config()

const chainIds = {
  hardhat: 31337,
  ganache: 1337,
  mainnet: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  sepolia: 11155111,
  kovan: 42,
  avax: 43114,
  avax_testnet: 43113,
  fantom: 250,
  fantom_testnet: 4002,
  polygon: 137,
  mumbai: 80001,
  optimism: 10,
  optimism_kovan: 69,
  optimism_goerli: 420,
  arbitrum: 42161,
  arbitrum_rinkeby: 421611,
  arbitrum_goerli: 421613,
  binance: 56,
  binance_testnet: 97,
};

// Ensure that we have all the environment variables we need.
const testPrivateKey = process.env.TEST_PRIVATE_KEY || "";
const alchemyKey = process.env.ALCHEMY_KEY || "";
function createTestnetConfig(network) {
  if (!alchemyKey) {
    throw new Error("Missing ALCHEMY_KEY");
  }

  const polygonNetworkName = network === "polygon" ? "mainnet" : "mumbai";

  let nodeUrl =
      chainIds[network] == 137 || chainIds[network] == 80001
          ? `https://polygon-${polygonNetworkName}.g.alchemy.com/v2/${alchemyKey}`
          : `https://eth-${network}.alchemyapi.io/v2/${alchemyKey}`;

  switch (network) {
    case "optimism":
      nodeUrl = `https://opt-mainnet.g.alchemy.com/v2/${alchemyKey}`;
      break;
    case "optimism_kovan":
      nodeUrl = `https://opt-kovan.g.alchemy.com/v2/${alchemyKey}`;
      break;
    case "optimism_goerli":
      nodeUrl = `https://opt-goerli.g.alchemy.com/v2/${alchemyKey}`;
      break;
    case "arbitrum":
      nodeUrl = `https://arb-mainnet.g.alchemy.com/v2/${alchemyKey}`;
      break;
    case "arbitrum_rinkeby":
      nodeUrl = `https://arb-rinkeby.g.alchemy.com/v2/${alchemyKey}`;
      break;
    case "arbitrum_goerli":
      nodeUrl = `https://arb-goerli.g.alchemy.com/v2/${alchemyKey}`;
      break;
    case "avax":
      nodeUrl = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case "avax_testnet":
      nodeUrl = "https://api.avax-test.network/ext/bc/C/rpc";
      break;
    case "fantom":
      nodeUrl = "https://rpc.ftm.tools";
      break;
    case "fantom_testnet":
      nodeUrl = "https://rpc.testnet.fantom.network";
      break;
    case "binance":
      nodeUrl = "https://bsc-dataseed1.binance.org/";
      break;
    case "binance_testnet":
      nodeUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
      break;
  }

  return {
    chainId: chainIds[network],
    url: nodeUrl,
    accounts: [`${testPrivateKey}`],
  };
}

module.exports = {
  networks: {
    sepolia: createTestnetConfig("sepolia"),
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
