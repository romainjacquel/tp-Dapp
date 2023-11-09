"use client";
import __ENV__ from "@/config";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const inter = Inter({ subsets: ["latin"] });

/* 1 - Le pb c'est que le composant ne peux pas être en "use client", du coup il faudrait bouger
tte la config rainbow kit dans son propre fichier et l'appeler ici.
*/
// export const metadata: Metadata = {
//   title: "Voting Dapp",
//   description: "Tp-Dapp for alyra",
// };

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

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<WagmiConfig config={wagmiConfig}>
					<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
				</WagmiConfig>
			</body>
		</html>
	);
}
