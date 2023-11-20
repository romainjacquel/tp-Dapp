"use client";

import { Container } from "@chakra-ui/react";
import NotConnected from "./components/not-connected";
import { RegisterProposal } from "./components/register-proposal";
import { RegisterVoters } from "./components/register-voters";
import { StartVoting } from "./components/start-voting";
import { VotingSession } from "./components/voting-session";
import WinningProposal from "./components/winning-proposal";
import useConnectedWallet from "./hooks/use-connected-wallet";
import useIsAuthorized from "./hooks/use-is-authorized";
import useWorkflowStatus from "./hooks/use-worflow-status";
import WorkflowStatus from "./types/workflow-status";

type RenderArgs = {
	workflowStatus: number | undefined;
	isAuthorized: boolean;
};

const render = ({ workflowStatus, isAuthorized }: RenderArgs) => {
	switch (true) {
		case WorkflowStatus.RegisteringVoters === workflowStatus && isAuthorized:
			return <RegisterVoters />;
		case WorkflowStatus.ProposalsRegistrationStarted === workflowStatus && isAuthorized:
			return <RegisterProposal />;
		case WorkflowStatus.ProposalsRegistrationEnded === workflowStatus && isAuthorized:
			return <StartVoting />;
		case WorkflowStatus.VotingSessionStarted === workflowStatus && isAuthorized:
			return <VotingSession />;
		case WorkflowStatus.VotingSessionEnded === workflowStatus && isAuthorized:
			return <WinningProposal />;
		default:
			// Si l'utilisateur n'est ni ower, ni voter => on renvoit un composant not authorized.
			if (!isAuthorized) return <h1>Not authorized</h1>;
			throw new Error("Workflow not found");
	}
};

export default function Home() {
	const connectedWallet = useConnectedWallet();
	const workflowStatus = useWorkflowStatus();
	const isAuthorized = useIsAuthorized();

	return connectedWallet?.isConnected ? (
		<Container maxW="8xl" centerContent>
			{render({
				workflowStatus,
				isAuthorized,
			})}
		</Container>
	) : (
		<NotConnected />
	);
}
