import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ChakraUiWrapper } from "./components/chakra-ui-wrapper";
import Header from "./components/header";
import { RainbowKitWrapper } from "./components/rainbowkit-wrapper";
import Steps from "./components/steps";
import { AppContextWrapper } from "./context/app-context";

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
			<ChakraUiWrapper>
				<RainbowKitWrapper>
					<AppContextWrapper>
						<Header />
						<Steps />
						{children}
					</AppContextWrapper>
				</RainbowKitWrapper>
			</ChakraUiWrapper>
		</body>
	</html>
);

export default RootLayout;
