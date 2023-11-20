const __ENV__ = {
	infuraApiKey: String(process.env.INFURA_API_KEY),
	walletConnectApiKey: String(process.env.WALLET_CONNECT_API_KEY),
	environment: String(process.env.NODE_ENV),
};

export default __ENV__;
