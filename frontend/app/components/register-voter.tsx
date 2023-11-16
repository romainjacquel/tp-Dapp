"use client";

import { baseConfig } from "@/app/utils/contract";
import __ENV__ from "@/config";
import React, { useState } from "react";
import { useContractEvent, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useHasMounted from "../hooks/use-has-mounted";
import useNotification from "../hooks/use-notification";
import { Form } from "./shared/form";
import { HeadLabel } from "./shared/head-label";

export const RegisterVoters = () => {
	const notification = useNotification();
	const [address, setAddress] = useState<string | undefined>(undefined);

	const hasMounted = useHasMounted();

	// Prepare contract
	const { config: startProposalConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "startProposalsRegistering",
	});

	const { config: addVoterConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "addVoter",
		args: [address],
	});

	// Contract write
	const startProposalsRegistering = useContractWrite(startProposalConfig);
	const addVoter = useContractWrite(addVoterConfig);

	// Wait for transaction
	const startProposalTransaction = useWaitForTransaction({
		hash: startProposalsRegistering.data?.hash,
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't start proposals registration",
				status: "error",
			}),
	});

	const addVoterTransaction = useWaitForTransaction({
		hash: addVoter.data?.hash,
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't add voter",
				status: "error",
			}),
	});

	// Contract event
	useContractEvent({
		...baseConfig,
		eventName: "VoterRegistered",
		listener: () =>
			notification?.({
				title: "Success",
				description: "Voter added successfully",
				status: "success",
			}),
	});

	useContractEvent({
		...baseConfig,
		eventName: "WorkflowStatusChange",
		listener: () =>
			notification?.({
				title: "Success",
				description: "Proposals registration started",
				status: "success",
			}),
	});

	return (
		hasMounted && (
			<>
				<HeadLabel label="Register voters" />
				<Form
					inputValue={address}
					inputType="text"
					setInputValue={setAddress}
					actionFn={addVoter.write}
					actionLabel="Add Voter"
					actionLoading={addVoter.isLoading || addVoterTransaction.isLoading}
					formLabel="Voter address"
					nextStepFn={startProposalsRegistering.write}
					nextStepLabel="Start Proposal Registering"
					nextStepLoading={startProposalTransaction.isLoading || startProposalTransaction.isLoading}
					placeholder="0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
					actionButtonLoadingText="Add Voter In Progress"
				/>
			</>
		)
	);
};
