import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  paths: {
    artifacts: './artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  },
  solidity: "0.8.17",
};

export default config;
