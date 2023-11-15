"use client";

import { contractAbi, contractAddress } from "@/app/utils/contract";
import React from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useHasMounted from "../hooks/use-has-mounted";
import { Form } from "./shared/form";
import { HeadLabel } from "./shared/head-label";

export const RegisterProposal = () => {
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
	});

	const { config: startVotingConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "startVotingSession",
	});

	const endProposalsRegistering = useContractWrite(endProposalConfig);
	const addProposal = useContractWrite(addProposalConfig);
	const startVoting = useContractWrite(startVotingConfig);

	const endProposalTransaction = useWaitForTransaction({
		hash: endProposalsRegistering.data?.hash,
		onSuccess: (data) => {
			console.log("endProposal Success", data);
		},
		onError: (error) => {
			console.log("endProposal Error", error);
		},
	});

	const addProposalTransaction = useWaitForTransaction({
		hash: addProposal.data?.hash,
		onSuccess: (data) => {
			console.log("addProposal Success", data);
		},
		onError: (error) => {
			console.log("addProposal Error", error);
		},
	});

	const startVotingTransaction = useWaitForTransaction({
		hash: startVoting.data?.hash,
		onSuccess: (data) => {
			console.log("startVoting Success", data);
		},
		onError: (error) => {
			console.log("startVoting Error", error);
		},
	});

	console.log(endProposalsRegistering.write, addProposal.write, startVoting.write);

	return (
		hasMounted && (
			<>
				<HeadLabel label="Register proposals" />
				<Form
					actionFn={addProposal.write}
					actionLabel="Add Proposal"
					actionLoading={addProposalTransaction.isLoading}
					formLabel="Proposal name"
					nextStepFn={endProposalsRegistering.write}
					nextStepLabel="End Proposal Registering"
					nextStepLoading={endProposalTransaction.isLoading}
					placeholder="The proposal id (ex: 1)"
				/>
			</>
		)
	);
};
