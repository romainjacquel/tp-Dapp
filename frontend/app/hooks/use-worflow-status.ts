import { useAppContext } from "../context";

const useWorkflowStatus = () => {
	const context = useAppContext();

	return context?.workflowStatus;
};

export default useWorkflowStatus;
