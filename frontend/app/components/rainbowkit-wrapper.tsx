"use client";

import __ENV__ from "@/config";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { hardhat } from "viem/chains";
import { WagmiConfig, configureChains, createConfig, sepolia } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

type RainbowKitWrapperProps = {
	children: ReactNode;
};

const config = {
	network: [__ENV__.environment === "development" ? hardhat : sepolia],
	providers:
		__ENV__.environment === "development"
			? [publicProvider()]
			: [infuraProvider({ apiKey: __ENV__.infuraApiKey }), publicProvider()],
};

// biome-ignore lint/suspicious/noExplicitAny: Hard to type, need to fix this later
const { chains, publicClient, webSocketPublicClient } = configureChains(config.network, config.providers as any);

const { connectors } = getDefaultWallets({
	appName: "My Dapp",
	projectId: __ENV__.walletConnectApiKey,
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: false,
	connectors,
	publicClient,
	webSocketPublicClient,
});

export const RainbowKitWrapper = ({ children }: RainbowKitWrapperProps) => (
	<WagmiConfig config={wagmiConfig}>
		<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
	</WagmiConfig>
);
