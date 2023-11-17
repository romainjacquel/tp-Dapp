import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NotConnected = () => {
	return (
		<Flex direction="column" justifyContent="center" alignItems="center" height="50vh">
			<Alert status="warning" width="30%" mb="1rem">
				<AlertIcon />
				Please connect your Wallet to our DApp.
			</Alert>
			<ConnectButton />
		</Flex>
	);
};

export default NotConnected;
