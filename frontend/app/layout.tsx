import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { RainbowKitWrapper } from "./shared/rainbowkit-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Voting Dapp",
	description: "Dapp for alyra",
};

export default function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<RainbowKitWrapper>{children}</RainbowKitWrapper>
			</body>
		</html>
	);
}
