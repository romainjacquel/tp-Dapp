import { useAppContext } from "../context/app-context";

const useWorkflowStatus = () => {
	const context = useAppContext();

	return context?.workflowStatus;
};

export default useWorkflowStatus;
