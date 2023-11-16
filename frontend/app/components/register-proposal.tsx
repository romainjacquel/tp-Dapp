"use client";

import { contractAbi, contractAddress } from "@/app/utils/contract";
import React, { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useHasMounted from "../hooks/use-has-mounted";
import useNotification from "../hooks/use-notification";
import { Form } from "./shared/form";
import { HeadLabel } from "./shared/head-label";

export const RegisterProposal = () => {
	const notification = useNotification();
	const [proposal, setProposal] = useState<string | undefined>(undefined);
	const hasMounted = useHasMounted();

	const { config: endProposalConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "endProposalsRegistering",
	});

	const { config: addProposalConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "addProposal",
		args: [proposal],
	});

	const endProposalsRegistering = useContractWrite(endProposalConfig);
	const addProposal = useContractWrite(addProposalConfig);

	const endProposalTransaction = useWaitForTransaction({
		hash: endProposalsRegistering.data?.hash,
		onSuccess: () =>
			notification?.({
				title: "Success",
				description: "Proposals registration ended",
				status: "success",
			}),
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't end proposals registration",
				status: "error",
			}),
	});

	const addProposalTransaction = useWaitForTransaction({
		hash: addProposal.data?.hash,
		onSuccess: () =>
			notification?.({
				title: "Success",
				description: "Add proposal successfully",
				status: "success",
			}),
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't add proposal",
				status: "error",
			}),
	});

	return (
		hasMounted && (
			<>
				<HeadLabel label="Register proposals" />
				<Form
					inputValue={proposal}
					inputType="text"
					setInputValue={setProposal}
					actionFn={addProposal.write}
					actionLabel="Add Proposal"
					actionLoading={addProposalTransaction.isLoading}
					formLabel="Proposal name"
					nextStepFn={endProposalsRegistering.write}
					nextStepLabel="End Proposal Registering"
					nextStepLoading={endProposalTransaction.isLoading}
					placeholder="The proposal name (ex: foo)"
				/>
			</>
		)
	);
};
