import { Flex, Heading } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import useProposals from "../hooks/use-proposals";
import useWinningProposalId from "../hooks/use-winning-proposal-id";

const WinningProposal = () => {
	const [proposals] = useProposals();
	const winningProposalID = useWinningProposalId();

	return (
		<Flex as="div" direction="column" align="center" justify="center">
			<FaTrophy size={32} />
			<Heading as="h2" size="lg" m="4">
				The Winning Proposal ID is "{proposals[0].description}" (id: {winningProposalID})
			</Heading>
		</Flex>
	);
};

export default WinningProposal;
