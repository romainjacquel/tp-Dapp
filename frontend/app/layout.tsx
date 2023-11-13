import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Header from "./components/header";
import { RainbowKitWrapper } from "./components/rainbowkit-wrapper";
import { AppContextWrapper } from "./context";
import "./globals.css";

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
				<AppContextWrapper>
					<Header />
					{children}
				</AppContextWrapper>
			</RainbowKitWrapper>
		</body>
	</html>
);

export default RootLayout;
