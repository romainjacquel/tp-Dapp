import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = () => (
	<header className="bg-indigo-500 p-4 text-white">
		<div className="container mx-auto flex justify-between items-center">
			<Link href="/" className="text-2xl font-bold">
				TP Dapp
			</Link>
			<ConnectButton />
		</div>
	</header>
);

export default Header;
