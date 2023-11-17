import { baseConfig } from "@/app/utils/contract";
import { Button } from "@chakra-ui/react";
import { useContractEvent, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useNotification from "../hooks/use-notification";

export const EndVoting = () => {
	const notification = useNotification();

	// Prepare contract
	const { config: endVotingConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "endVotingSession",
	});

	// Contract write
	const endVoting = useContractWrite(endVotingConfig);

	// Wait for transaction
	const endVotingTransaction = useWaitForTransaction({
		hash: endVoting.data?.hash,
		onError: () =>
			notification?.({
				title: "Error",
				description: "Unable to complete voting session",
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
				description: "Voting session ended",
				status: "success",
			}),
	});

	return (
		<Button
			mt={4}
			type="button"
			isLoading={endVoting.isLoading || endVotingTransaction.isLoading}
			loadingText="Transaction pending"
			colorScheme="red"
			variant="outline"
			onClick={endVoting.write}
		>
			End Voting Session
		</Button>
	);
};

export default EndVoting;
