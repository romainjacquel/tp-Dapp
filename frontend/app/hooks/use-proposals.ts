import { Dispatch, SetStateAction } from "react";
import { useAppContext } from "../context/app-context";
import { Proposal } from "../types/proposal";

const useProposals = () => {
	const context = useAppContext();

	return [context?.proposals, context?.setProposals] as [Proposal[], Dispatch<SetStateAction<Proposal[] | null>>];
};

export default useProposals;
