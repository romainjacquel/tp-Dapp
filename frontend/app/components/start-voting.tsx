import { baseConfig } from "@/app/utils/contract";
import { Button } from "@chakra-ui/react";
import { useContractEvent, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useNotification from "../hooks/use-notification";

export const StartVoting = () => {
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

	return (
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
	);
};
