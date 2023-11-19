"use client";

import {
	Box,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
} from "@chakra-ui/react";
import useConnectedWallet from "../hooks/use-connected-wallet";
import useHasMounted from "../hooks/use-has-mounted";
import useWorkflowStatus from "../hooks/use-worflow-status";
import WorkflowStatus from "../types/workflow-status";

const WORKFLOWS = Object.values(WorkflowStatus).flatMap((key) => {
	if (typeof key === "number" || key === "VotingSessionEnded") return [];
	return key;
});

const Steps = () => {
	const connectedWallet = useConnectedWallet();
	const hasMounted = useHasMounted();
	const workflowStatus = useWorkflowStatus();

	return hasMounted && connectedWallet?.address ? (
		<Stepper p="2rem" colorScheme="teal" index={workflowStatus ?? 0}>
			{WORKFLOWS.map((workflow, index) => (
				<Step key={index}>
					<StepIndicator>
						<StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
					</StepIndicator>
					<Box flexShrink="0">
						<StepTitle>{workflow}</StepTitle>
					</Box>
					<StepSeparator />
				</Step>
			))}
		</Stepper>
	) : null;
};

export default Steps;
