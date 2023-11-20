const __ENV__ = {
	infuraApiKey: String(process.env.INFURA_API_KEY),
	walletConnectApiKey: String(process.env.WALLET_CONNECT_API_KEY),
	environment: String(process.env.NODE_ENV),
	contractAddressHardhat: String(process.env.CONTRACT_ADDRESS_HARDHAT),
	contractAddressSepolia: String(process.env.CONTRACT_ADDRESS_SEPOLIA),
};

export default __ENV__;
