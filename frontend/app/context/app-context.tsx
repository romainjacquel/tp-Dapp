"use client";

import { baseConfig } from "@/app/utils/contract";
import { useToast } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { GetAccountResult } from "wagmi/actions";
import { Proposal } from "../types/proposal";
import Voter from "../types/voter";

export type AppContextType = {
	connectedWallet: GetAccountResult;
	workflowStatus: number;
	winningProposalID: number;
	notification: ReturnType<typeof useToast>;
	setProposals: Dispatch<SetStateAction<Proposal[]>>;
	proposals: Proposal[];
	owner: string;
	voter: Voter;
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
	const { data: owner } = useContractRead({
		...baseConfig,
		functionName: "owner",
	});
	const { data: voter } = useContractRead({
		...baseConfig,
		functionName: "getVoter",
		watch: true,
		args: [wallet?.address],
	});

	const notification = useToast();

	const value = {
		connectedWallet: wallet,
		workflowStatus: Number(workflow),
		winningProposalID: Number(winning),
		notification,
		proposals,
		setProposals,
		owner: String(owner),
		voter: voter as Voter,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
