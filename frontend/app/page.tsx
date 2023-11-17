"use client";

import { Container } from "@chakra-ui/react";
import { EndVoting } from "./components/end-voting";
import NotConnected from "./components/not-connected";
import { RegisterProposal } from "./components/register-proposal";
import { RegisterVoters } from "./components/register-voter";
import { StartVoting } from "./components/start-voting";
import useConnectedWallet from "./hooks/use-connected-wallet";
import useWorkflowStatus from "./hooks/use-worflow-status";
import WorkflowStatus from "./types/workflow-status";
import VotesTallied from "./components/votesTallied";

export default function Home() {
	const connectedWallet = useConnectedWallet();
	const workflowStatus = useWorkflowStatus();

	return connectedWallet?.isConnected ? (
		<Container maxW="8xl" centerContent>
			{WorkflowStatus.RegisteringVoters === workflowStatus && <RegisterVoters />}
			{WorkflowStatus.ProposalsRegistrationStarted === workflowStatus && <RegisterProposal />}
			{WorkflowStatus.ProposalsRegistrationEnded === workflowStatus && <StartVoting />}
			{WorkflowStatus.VotingSessionStarted === workflowStatus && <h1>Voting session started</h1>}
			{WorkflowStatus.VotingSessionEnded === workflowStatus && <EndVoting />}
			{WorkflowStatus.VotesTallied === workflowStatus && <VotesTallied />}
		</Container>
	) : (
		<NotConnected />
	);
}
