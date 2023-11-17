import { baseConfig } from "@/app/utils/contract";
import { Button, Checkbox, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { useContractEvent, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import useNotification from "../hooks/use-notification";
import useProposals from "../hooks/use-proposals";
import { HeadLabel } from "./shared/head-label";
import { Table } from "./shared/table";

export const VotingSession = () => {
	const notification = useNotification();
	const [proposals] = useProposals();
	const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

	// Prepare contract
	const { config: startVotingConfig } = usePrepareContractWrite({
		...baseConfig,
		functionName: "setVote",
		args: [selectedProposal],
	});

	// Contract write
	const setVote = useContractWrite(startVotingConfig);

	// Wait for transaction
	const setVoteTransaction = useWaitForTransaction({
		hash: setVote.data?.hash,
		onError: () =>
			notification?.({
				title: "Error",
				description: "Can't set vote",
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
				description: "Set vote done",
				status: "success",
			}),
	});

	return (
		<>
			<HeadLabel label="Add vote" />
			<Button
				type="button"
				isDisabled={!selectedProposal}
				onClick={setVote.write}
				isLoading={setVote.isLoading || setVoteTransaction.isLoading}
				loadingText="Set vote in progress"
				colorScheme="teal"
				variant="solid"
			>
				Add vote
			</Button>
			<Table columns={["", "ID", "Description"]}>
				{proposals.map((proposal, index) => (
					<Tr key={index}>
						<Td>
							<Checkbox
								disabled={selectedProposal !== proposal.id && selectedProposal !== null}
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
		</>
	);
};
