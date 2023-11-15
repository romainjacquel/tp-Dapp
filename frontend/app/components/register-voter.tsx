"use client";

import { contractAbi, contractAddress } from "@/app/utils/contract";
import { Button, FormControl, FormLabel, Grid, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const RegisterVoters = () => {
	const { config: startProposalConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "startProposalsRegistering",
	});

	const { config: addVoterConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "addVoter",
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
		<>
			<Heading py="4" color="teal.500">
				Register voters
			</Heading>
			<Grid templateRows="repeat(2, 1fr)" gap={4}>
				<FormControl w="2xl">
					<FormLabel>Voter address</FormLabel>
					<Input type="text" placeholder="0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" />
					{/* <FormHelperText>Enter a valid adress (ex: )</FormHelperText> */}
				</FormControl>
				<Grid templateColumns="repeat(2, 1fr)" gap={4}>
					<Button
						type="button"
						isLoading={startProposalTransaction.isLoading}
						loadingText="Transaction pending"
						colorScheme="red"
						variant="outline"
						onClick={startProposalsRegistering.write}
					>
						Start Proposal Registering
					</Button>
					<Button
						type="button"
						onClick={addVoter.write}
						isLoading={addVoterTransaction.isLoading}
						loadingText="Submitting"
						colorScheme="teal"
						variant="solid"
					>
						Add voter
					</Button>
				</Grid>
			</Grid>
		</>
	);
};
