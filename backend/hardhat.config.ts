import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";
import "hardhat-gas-reporter";
import "solidity-coverage";

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		sepolia: {
			url: process.env.SEPOLIA_RPC_URL,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
			chainId: 11155111,
			blockConfirmations: 6,
		},
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
	},
	gasReporter: {
		enabled: true,
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
	solidity: {
		compilers: [
			{
				version: "0.8.20",
			},
		],
	},
};
