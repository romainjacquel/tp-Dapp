"use client";

import { baseConfig, parseContractEvent } from "@/app/utils/contract";
import { Container } from "@chakra-ui/react";
import { useContractEvent } from "wagmi";
import NotConnected from "./components/not-connected";
import { RegisterProposal } from "./components/register-proposal";
import { RegisterVoters } from "./components/register-voters";
import { StartVoting } from "./components/start-voting";
import { VotingSession } from "./components/voting-session";
import WinningProposal from "./components/winning-proposal";
import useConnectedWallet from "./hooks/use-connected-wallet";
import useIsAuthorized from "./hooks/use-is-authorized";
import useNotification from "./hooks/use-notification";
import useWorkflowStatus from "./hooks/use-worflow-status";
import { EventData, WorkflowStatusEventArgs } from "./types/contract-event";
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
	const notification = useNotification();

	useContractEvent({
		...baseConfig,
		eventName: "WorkflowStatusChange",
		listener: ([data]) => {
			const args = (data as unknown as EventData<WorkflowStatusEventArgs>).args;

			const notificationDescription = parseContractEvent({ args });

			if (notificationDescription) {
				return notification?.({
					title: "Success",
					description: notificationDescription,
					status: "success",
				});
			}
			return notification?.({
				title: "Warning",
				description: "Unknow event received",
				status: "success",
			});
		},
	});

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
