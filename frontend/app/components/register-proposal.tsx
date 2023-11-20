"use client";

import { baseConfig } from "@/app/utils/contract";
import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { useContractEvent, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useGetVoter from "../hooks/use-get-voter";
import useHasMounted from "../hooks/use-has-mounted";
import useNotification from "../hooks/use-notification";
import useProposals from "../hooks/use-proposals";
import { Form } from "./shared/form";
import { HeadLabel } from "./shared/head-label";

export const RegisterProposal = () => {
	const notification = useNotification();
	const [proposals, setProposals] = useProposals();
	const [proposal, setProposal] = useState<string | undefined>(undefined);
	const hasMounted = useHasMounted();
	const voter = useGetVoter();

	// Prepare contract
	const { config: endProposalConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "endProposalsRegistering",
	});

	const { config: addProposalConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "addProposal",
		args: [proposal],
	});

	// Contract write
	const endProposalsRegistering = useContractWrite(endProposalConfig);
	const addProposal = useContractWrite(addProposalConfig);

	// Wait for transaction
	const endProposalTransaction = useWaitForTransaction({
		hash: endProposalsRegistering.data?.hash,
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't end proposals registration",
				status: "error",
			}),
	});

	const addProposalTransaction = useWaitForTransaction({
		hash: addProposal.data?.hash,
		onSuccess: () => {
			if (proposal) {
				setProposals([...proposals, { description: proposal, id: proposals?.length ?? 0 }]);
			}
		},
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't add proposal",
				status: "error",
			}),
	});

	// Contract event
	useContractEvent({
		...baseConfig,
		eventName: "ProposalRegistered",
		listener: () =>
			notification?.({
				title: "Success",
				description: "Add proposal successfully",
				status: "success",
			}),
	});

	useContractEvent({
		...baseConfig,
		eventName: "WorkflowStatusChange",
		listener: () =>
			notification?.({
				title: "Success",
				description: "Proposals registration ended",
				status: "success",
			}),
	});

	return (
		hasMounted && (
			<>
				{voter?.isRegistered ? (
					<>
						<HeadLabel label="Register proposals" />
						<Form
							inputValue={proposal}
							inputType="text"
							setInputValue={setProposal}
							actionFn={addProposal.write}
							actionLabel="Add Proposal"
							actionLoading={addProposal.isLoading || addProposalTransaction.isLoading}
							formLabel="Proposal name"
							nextStepFn={endProposalsRegistering.write}
							nextStepLabel="End Proposal Registering"
							nextStepLoading={endProposalsRegistering.isLoading || endProposalTransaction.isLoading}
							placeholder="The proposal name (ex: foo)"
							actionButtonLoadingText="Add Proposal In Progress"
						/>
					</>
				) : (
					<Heading as="h2" size="lg" m="4">
						Voters registration in progress
					</Heading>
				)}
			</>
		)
	);
};
