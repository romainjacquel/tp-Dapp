import { Button } from "@chakra-ui/react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { contractAbi, contractAddress } from "../utils/contract";

export const StartVoting = () => {
	const { config: startVotingConfig } = usePrepareContractWrite({
		address: contractAddress,
		abi: contractAbi,
		functionName: "startVotingSession",
	});

	const startVoting = useContractWrite(startVotingConfig);

	const startVotingTransaction = useWaitForTransaction({
		hash: startVoting.data?.hash,
		onSuccess: (data) => {
			console.log("startVoting Success", data);
		},
		onError: (error) => {
			console.log("startVoting Error", error);
		},
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
