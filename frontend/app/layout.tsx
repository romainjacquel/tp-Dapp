"use client";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const inter = Inter({ subsets: ["latin"] });

/* 1 - Le pb c'est que le composant ne peux pas être en "use client", du coup il faudrait bouger
tte la config rainbow kit dans son propre fichier et l'appeler ici.
   2 - Voir pour remplacer eslint par biome */
// export const metadata: Metadata = {
//   title: "Voting Dapp",
//   description: "Tp-Dapp for alyra",
// };

const { chains, publicClient } = configureChains(
  [sepolia, hardhat],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My Dapp",
  projectId: process.env.WALLET_CONNECT_API_KEY!,
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
  children: React.ReactNode;
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
