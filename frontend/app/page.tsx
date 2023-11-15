"use client";

import { Container } from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import { RegisterVoters } from "./components/register-voter";
import useConnectedWallet from "./hooks/use-connected-wallet";
import { contractAbi, contractAddress } from "./utils/contract";

enum WorkflowStatus {
	RegisteringVoters = 0,
	ProposalsRegistrationStarted = 1,
	ProposalsRegistrationEnded = 2,
	VotingSessionStarted = 3,
	VotingSessionEnded = 4,
	VotesTallied = 5,
}

export default function Home() {
	// todo => Create component for conditional display if a wallet is connected
	const connectedWallet = useConnectedWallet();

	const { data, error, isLoading } = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "workflowStatus",
		watch: true,
	});

	console.log(data);

	return (
		<Container maxW="8xl" centerContent>
			{WorkflowStatus.RegisteringVoters === data && <RegisterVoters />}
			{WorkflowStatus.ProposalsRegistrationStarted === data && <h1>TOOOOOOOOOOOOOOOO</h1>}
		</Container>
	);
}
