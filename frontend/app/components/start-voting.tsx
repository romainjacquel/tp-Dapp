import { Button } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useNotification from "../hooks/use-notification";
import { contractAbi, contractAddress } from "../utils/contract";

export const StartVoting = () => {
	const notification = useNotification();
	const { config: startVotingConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "startVotingSession",
	});

	const startVoting = useContractWrite(startVotingConfig);

	const startVotingTransaction = useWaitForTransaction({
		hash: startVoting.data?.hash,
		onSuccess: () =>
			notification?.({
				title: "Success",
				description: "Voting session started",
				status: "success",
			}),
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't start voting session",
				status: "error",
			}),
	});

	return (
		<Button
			mt={4}
			type="button"
			isLoading={startVotingTransaction.isLoading}
			loadingText="Transaction pending"
			colorScheme="red"
			variant="outline"
			onClick={startVoting.write}
		>
			Start Voting Session
		</Button>
	);
};
