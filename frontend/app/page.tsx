"use client";

import { Container } from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import { RegisterProposal } from "./components/register-proposal";
import { RegisterVoters } from "./components/register-voter";
import { StartVoting } from "./components/start-voting";
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
	const connectedWallet = useConnectedWallet();

	const { data } = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "workflowStatus",
		watch: true,
	});

	console.log(data);

	return connectedWallet?.isConnected ? (
		<Container maxW="8xl" centerContent>
			{WorkflowStatus.RegisteringVoters === data && <RegisterVoters />}
			{WorkflowStatus.ProposalsRegistrationStarted === data && <RegisterProposal />}
			{WorkflowStatus.ProposalsRegistrationEnded === data && <StartVoting />}
			{WorkflowStatus.VotingSessionStarted === data && <h1>Voting session started</h1>}
		</Container>
	) : (
		<h1>Not connected</h1>
	);
}
