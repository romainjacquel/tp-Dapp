import { Checkbox, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { Table } from "./shared/table";

export const VotingSession = () => {
	const [selectedProposal, setSelectedProposal] = useState<number | undefined>(undefined);

	// const proposals = data as Proposal[];

	const proposals = [
		{ description: "test", id: 1 },
		{ description: "test2", id: 2 },
	];

	return (
		<div>
			<Table columns={["", "Proposal ID", "Proposal Name"]}>
				{proposals.map((proposal, index) => (
					<Tr key={index}>
						<Td>
							<Checkbox
								disabled={selectedProposal !== proposal.id && selectedProposal !== undefined}
								onChange={(e) => {
									if (e.target.checked) setSelectedProposal(proposal.id);
									else setSelectedProposal(undefined);
								}}
							/>
						</Td>
						<Td>{proposal.id}</Td>
						<Td>{proposal.description}</Td>
					</Tr>
				))}
			</Table>
		</div>
	);
};
