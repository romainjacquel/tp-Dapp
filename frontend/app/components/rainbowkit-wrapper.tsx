"use client";

import __ENV__ from "@/config";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { WagmiConfig, configureChains, createConfig, sepolia } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

type RainbowKitWrapperProps = {
	children: ReactNode;
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[sepolia],
	[infuraProvider({ apiKey: __ENV__.infuraApiKey }), publicProvider()],
);

// const { chains, publicClient, webSocketPublicClient } = configureChains([hardhat], [publicProvider()]);

const { connectors } = getDefaultWallets({
	appName: "My Dapp",
	projectId: __ENV__.walletConnectApiKEy,
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
