import { Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => (
	<Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500" color="white">
		<Text fontSize="25" fontWeight="bold">
			TP Dapp
		</Text>
		<ConnectButton />
	</Flex>
);

export default Header;
