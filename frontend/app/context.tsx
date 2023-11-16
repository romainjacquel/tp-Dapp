"use client";

import { ReactNode, createContext, useContext } from "react";
import { useAccount, useContractRead } from "wagmi";
import { GetAccountResult } from "wagmi/actions";
import { contractAbi, contractAddress } from "./utils/contract";

export type AppContextType = {
	connectedWallet: GetAccountResult;
	workflowStatus: number;
} | null;

const AppContext = createContext<AppContextType>(null);

export function AppContextWrapper({ children }: { children: ReactNode }) {
	const wallet = useAccount();
	const { data } = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "workflowStatus",
		watch: true,
	});
	const value = {
		connectedWallet: wallet,
		workflowStatus: Number(data),
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
