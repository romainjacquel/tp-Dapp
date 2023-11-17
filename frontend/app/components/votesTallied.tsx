import { Box, Heading } from "@chakra-ui/react";
import useWinningProposalId from "../hooks/use-winning-proposal-id";

const VotesTallied = () => {
  const winningProposalID = useWinningProposalId();

  return (
    <Box p="4" boxShadow="md" borderRadius="md" bg="white">
      <Heading as="h2" size="lg" m="4">
        The Winning Proposal ID is : {winningProposalID}
      </Heading>
    </Box>
  );
};

export default VotesTallied;