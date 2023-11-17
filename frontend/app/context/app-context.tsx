"use client";

import { baseConfig } from "@/app/utils/contract";
import { useToast } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { GetAccountResult } from "wagmi/actions";
import { Proposal } from "../types/proposal";

export type AppContextType = {
	connectedWallet: GetAccountResult;
	workflowStatus: number;
	winningProposalID: number;
	notification: ReturnType<typeof useToast>;
	setProposals: Dispatch<SetStateAction<Proposal[]>>;
	proposals: Proposal[];
} | null;

const AppContext = createContext<AppContextType>(null);

export function AppContextWrapper({ children }: { children: ReactNode }) {
	const [proposals, setProposals] = useState<Proposal[]>([]);
	const wallet = useAccount();

	const { data: workflow } = useContractRead({
		...baseConfig,
		functionName: "workflowStatus",
		watch: true,
	});
	const { data: winning } = useContractRead({
		...baseConfig,
		functionName: "winningProposalID",
		watch: true,
	});

	const notification = useToast();

	const value = {
		connectedWallet: wallet,
		workflowStatus: Number(workflow),
		winningProposalID: Number(winning),
		notification,
		proposals,
		setProposals,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
