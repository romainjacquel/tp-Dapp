import { baseConfig } from "@/app/utils/contract";
import { Button, Heading } from "@chakra-ui/react";
import { useContractEvent, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useGetVoter from "../hooks/use-get-voter";
import useIsOwner from "../hooks/use-is-owner";
import useNotification from "../hooks/use-notification";

export const StartVoting = () => {
	const isOwner = useIsOwner();
	const isVoter = useGetVoter()?.isRegistered;
	const notification = useNotification();

	// Prepare contract
	const { config: startVotingConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "startVotingSession",
	});

	// Contract write
	const startVoting = useContractWrite(startVotingConfig);

	// Wait for transaction
	const startVotingTransaction = useWaitForTransaction({
		hash: startVoting.data?.hash,
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't start voting session",
				status: "error",
			}),
	});

	// Contract event
	useContractEvent({
		...baseConfig,
		eventName: "WorkflowStatusChange",
		listener: () =>
			notification?.({
				title: "Success",
				description: "Voting session started",
				status: "success",
			}),
	});

	return isOwner ? (
		<Button
			mt={4}
			type="button"
			isLoading={startVoting.isLoading || startVotingTransaction.isLoading}
			loadingText="Transaction pending"
			colorScheme="red"
			variant="outline"
			onClick={startVoting.write}
		>
			Start Voting Session
		</Button>
	) : isVoter ? (
		<Heading as="h2" size="lg" m="4">
			The voting recording session will begin soon
		</Heading>
	) : (
		<h1>Not authorized</h1>
	);
};
