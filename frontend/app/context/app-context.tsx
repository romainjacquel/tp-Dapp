"use client";

import { baseConfig } from "@/app/utils/contract";
import { useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useContext } from "react";
import { useAccount, useContractRead } from "wagmi";
import { GetAccountResult } from "wagmi/actions";

export type AppContextType = {
	connectedWallet: GetAccountResult;
	workflowStatus: number;
	notification: ReturnType<typeof useToast>;
} | null;

const AppContext = createContext<AppContextType>(null);

export function AppContextWrapper({ children }: { children: ReactNode }) {
	const wallet = useAccount();

	const { data } = useContractRead({
		...baseConfig,
		functionName: "workflowStatus",
		watch: true,
	});

	const notification = useToast();

	const value = {
		connectedWallet: wallet,
		workflowStatus: Number(data),
		notification,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	return useContext(AppContext);
}
