"use client";

import { Container } from "@chakra-ui/react";
import { RegisterProposal } from "./components/register-proposal";
import { RegisterVoters } from "./components/register-voter";
import { StartVoting } from "./components/start-voting";
import useConnectedWallet from "./hooks/use-connected-wallet";
import useWorkflowStatus from "./hooks/use-worflow-status";
import Steps from "./components/steps";
import NotConnected from "./components/not-connected";

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
	const workflowStatus = useWorkflowStatus();

	return connectedWallet?.isConnected ? (
		<>
		<Steps />
		<Container maxW="8xl" centerContent>
			{WorkflowStatus.RegisteringVoters === workflowStatus && <RegisterVoters />}
			{WorkflowStatus.ProposalsRegistrationStarted === workflowStatus && <RegisterProposal />}
			{WorkflowStatus.ProposalsRegistrationEnded === workflowStatus && <StartVoting />}
			{WorkflowStatus.VotingSessionStarted === workflowStatus && <h1>Voting session started</h1>}
		</Container>
		</>
	) : (
		<NotConnected/>
	);
}
