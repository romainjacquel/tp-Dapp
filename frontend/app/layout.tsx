import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { AppContextWrapper } from "./context";
import { RainbowKitWrapper } from "./shared/rainbowkit-wrapper";

type RootLayoutProps = {
	children: ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Voting Dapp",
	description: "Dapp for alyra",
};

const RootLayout = ({ children }: RootLayoutProps) => (
	<html lang="en">
		<body className={inter.className}>
			<RainbowKitWrapper>
				<AppContextWrapper>{children}</AppContextWrapper>
			</RainbowKitWrapper>
		</body>
	</html>
);

export default RootLayout;
