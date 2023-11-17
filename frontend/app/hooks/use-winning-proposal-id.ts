import { useAppContext } from "../context/app-context";

const useWinningProposalId = () => {
	const context = useAppContext();

	return context?.winningProposalID;
};

export default useWinningProposalId;
