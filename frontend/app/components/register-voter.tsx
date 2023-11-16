"use client";

import { contractAbi, contractAddress } from "@/app/utils/contract";
import React, { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useHasMounted from "../hooks/use-has-mounted";
import { Form } from "./shared/form";
import { HeadLabel } from "./shared/head-label";

export const RegisterVoters = () => {
	const [address, setAddress] = useState<string | null>(null);

	const hasMounted = useHasMounted();

	const { config: startProposalConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "startProposalsRegistering",
	});

	const { config: addVoterConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "addVoter",
		args: [address],
	});

	const startProposalsRegistering = useContractWrite(startProposalConfig);
	const addVoter = useContractWrite(addVoterConfig);

	const startProposalTransaction = useWaitForTransaction({
		hash: startProposalsRegistering.data?.hash,
		onSuccess: (data) => {
			console.log("startProposal Success", data);
		},
		onError: (error) => {
			console.log("startProposal Error", error);
		},
	});

	const addVoterTransaction = useWaitForTransaction({
		hash: addVoter.data?.hash,
		onSuccess: (data) => {
			console.log("addVoter Success", data);
		},
		onError: (error) => {
			console.log("addVoter Error", error);
		},
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
					actionLoading={addVoterTransaction.isLoading}
					formLabel="Voter address"
					nextStepFn={startProposalsRegistering.write}
					nextStepLabel="Start Proposal Registering"
					nextStepLoading={startProposalTransaction.isLoading}
					placeholder="0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
				/>
			</>
		)
	);
};
