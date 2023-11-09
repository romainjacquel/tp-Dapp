"use client";

import __ENV__ from "@/config";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

type RainbowKitWrapperProps = {
	children: ReactNode;
};

const { chains, publicClient } = configureChains(
	[sepolia, hardhat],
	[infuraProvider({ apiKey: __ENV__.infuraApiKey }), publicProvider()],
);

const { connectors } = getDefaultWallets({
	appName: "My Dapp",
	projectId: __ENV__.walletConnectApiKEy,
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: false,
	connectors,
	publicClient,
});

export const RainbowKitWrapper = ({ children }: RainbowKitWrapperProps) => {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
		</WagmiConfig>
	);
};
