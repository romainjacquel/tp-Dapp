import { Box, Heading } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import useWinningProposalId from "../hooks/use-winning-proposal-id";

const VotesTallied = () => {
	const winningProposalID = useWinningProposalId();

	return (
		<Box p="4" boxShadow="md" borderRadius="md" bg="white">
			<Heading as="h2" size="lg" m="4" display="flex" alignItems="center">
				<FaTrophy size={32} style={{ marginRight: "10px" }} />
				The Winning Proposal ID is: {winningProposalID}
			</Heading>
		</Box>
	);
};

export default VotesTallied;
