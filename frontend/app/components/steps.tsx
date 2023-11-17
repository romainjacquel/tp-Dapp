import {
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Box,
} from "@chakra-ui/react";
import useWorkflowStatus from "../hooks/use-worflow-status";

const Steps = () => {

  const workflowStatus = useWorkflowStatus()
  const workflow = ["RegisteringVoters", "ProposalsRegistrationStarted", "ProposalsRegistrationEnded", "VotingSessionStarted", "VotingSessionEnded", "VotesTallied"]
 
  return (
    <Stepper size='lg' p="2rem" colorScheme="teal" index={workflowStatus ?? 0}>
      {workflow.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step}</StepTitle>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default Steps;
