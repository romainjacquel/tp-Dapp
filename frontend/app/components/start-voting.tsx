import { baseConfig } from "@/app/utils/contract";
import { Button, Heading } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useGetVoter from "../hooks/use-get-voter";
import useIsOwner from "../hooks/use-is-owner";
import useNotification from "../hooks/use-notification";
import NotAuthorized from "./shared/not-authorized";

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
		<NotAuthorized />
	);
};
