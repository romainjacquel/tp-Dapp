import { baseConfig } from "@/app/utils/contract";
import { Button, Checkbox, Flex, Td, Text, Tr } from "@chakra-ui/react";
import { useState } from "react";
import {
	useContractEvent,
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from "wagmi";
import useConnectedWallet from "../hooks/use-connected-wallet";
import useNotification from "../hooks/use-notification";
import useProposals from "../hooks/use-proposals";
import Voter from "../types/voter";
import { HeadLabel } from "./shared/head-label";
import { Table } from "./shared/table";

export const VotingSession = () => {
	const connectedWallet = useConnectedWallet();
	const notification = useNotification();
	const [proposals] = useProposals();
	const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

	// Contract reead
	const { data } = useContractRead({
		...baseConfig,
		functionName: "getVoter",
		watch: true,
		args: [connectedWallet?.address],
	});

	const voter = data as Voter;

	// Prepare contract
	const { config: startVotingConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "setVote",
		args: [selectedProposal],
	});

	const { config: endVotingConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "endVotingSession",
	});

	// Contract write
	const setVote = useContractWrite(startVotingConfig);
	const endVoting = useContractWrite(endVotingConfig);

	// Wait for transaction
	const setVoteTransaction = useWaitForTransaction({
		hash: setVote.data?.hash,
		onSuccess: () => setSelectedProposal(null),
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't set vote",
				status: "error",
			}),
	});

	const endVotingTransaction = useWaitForTransaction({
		hash: endVoting.data?.hash,
		onSuccess: () => setSelectedProposal(null),
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't end voting session",
				status: "error",
			}),
	});

	// Contract event
	useContractEvent({
		...baseConfig,
		eventName: "Voted",
		listener: () =>
			notification?.({
				title: "Success",
				description: "Set vote done",
				status: "success",
			}),
	});

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
		<>
			<HeadLabel label="Register vote" />
			<Table columns={["", "ID", "Description"]}>
				{proposals.map((proposal, index) => (
					<Tr key={index}>
						<Td>
							<Checkbox
								disabled={(selectedProposal !== proposal.id && selectedProposal !== null) || voter.hasVoted}
								onChange={(e) => {
									if (e.target.checked) setSelectedProposal(proposal.id);
									else setSelectedProposal(null);
								}}
							/>
						</Td>
						<Td>{proposal.id}</Td>
						<Td>{proposal.description}</Td>
					</Tr>
				))}
			</Table>
			<Flex as="div" w="2xl" align="center" justify="center" paddingTop="0.5rem" color="white" gap={4}>
				<Button
					width="100%"
					type="button"
					isLoading={endVoting.isLoading || endVotingTransaction.isLoading}
					loadingText="End voting session in progress"
					colorScheme="red"
					variant="outline"
					onClick={endVoting.write}
				>
					End vote registering
				</Button>
				{voter.hasVoted ? (
					<Text width="100%" fontSize="md" color="red">
						You have already voted
					</Text>
				) : (
					<Button
						width="100%"
						type="button"
						isDisabled={selectedProposal === null}
						onClick={setVote.write}
						isLoading={setVote.isLoading || setVoteTransaction.isLoading}
						loadingText="Set vote in progress"
						colorScheme="teal"
						variant="solid"
					>
						Add vote
					</Button>
				)}
			</Flex>
		</>
	);
};
