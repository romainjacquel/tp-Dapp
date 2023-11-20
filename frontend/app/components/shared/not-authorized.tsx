import { Flex, Heading, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NotAuthorized = () => {
	return (
		<Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100">
			<Heading mb={4}>Access Denied</Heading>
			<Text color="gray.600" fontSize="lg" mb={4}>
				You are not authorized to access tp-Dapp. Please log connect your wallet to continue.
			</Text>
			<ConnectButton />
		</Flex>
	);
};

export default NotAuthorized;
